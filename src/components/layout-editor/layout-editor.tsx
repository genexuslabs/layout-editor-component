import {
  Component,
  Element,
  Event,
  EventEmitter,
  Listen,
  Prop,
  Watch
} from "@stencil/core";
import {
  controlResolver,
  isCellSelected
} from "./layout-editor-control-resolver";
import {
  findParentCell,
  findValidDropTarget,
  getCellData,
  getControlId,
  getDropTargetData,
  isEmptyContainerDrop
} from "./layout-editor-helpers";
// The following import must be commented until Stencil issue regarding SASS @imports
// of imported components and the SASS Stencil plugin is solved.
// Meanwhile the dependency is loaded manually
// import "@genexus/web-controls-library";

@Component({
  shadow: false,
  styleUrl: "layout-editor.scss",
  tag: "gx-layout-editor"
})
export class LayoutEditor {
  @Element() element: HTMLElement;

  /**
   * The abstract form model object
   */
  @Prop() model: any;

  /**
   * Array with the identifiers of the selected controls. If empty the whole layout-editor is marked as selected.
   */
  @Prop({ mutable: true })
  selectedControls: string[] = [];

  @Watch("selectedControls")
  watchSelectedControls() {
    this.controlSelected.emit({
      controls: this.selectedControls
    });
  }

  /**
   * Fired when a control is moved inside the layout editor to a new location
   *
   * An object containing information of the move operation is sent in the `detail` property of the event object
   *
   * Regardless where the control was dropped, the detail object will contain information about the source row and the id of the dropped control:
   *
   * | Property         | Details                                                                                                          |
   * | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
   * | `sourceCellId`   | Identifier of the source cell                                                                                    |
   * | `sourceRowId`    | Identifier of the source row                                                                                     |
   *
   * Depending on where the control was dropped, additional information will be provided and different properties will be set. There are four possible cases:
   *
   * 1. Dropped on an empty container or on a new row that will be the last row of a container
   * 2. Dropped on a new row of a non empty container
   * 3. Dropped on an existing empty cell
   * 4. Dropped on an existing row
   *
   *
   * ###### 1. Dropped on an empty container or on a new row that will be the last row of a container
   *
   * | Property          | Details                                                                                                                                     |
   * | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `containerId`     | Identifier of the container where the control was dropped                                                                                   |
   *
   * ###### 2. Dropped on a new row of a non empty container
   *
   * | Property          | Details                                                                                                                                     |
   * | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `beforeRowId`     | Identifier of the row next to the row where the control was dropped. An empty string if dropped in the last row or on an empty container.   |
   *
   * ###### 3. Dropped on an existing empty cell
   *
   * | Property      | Details                                                                                                          |
   * | ------------- | ---------------------------------------------------------------------------------------------------------------- |
   * | `targetCellId`| Identifier of the cell where the control was dropped |
   *
   *  ###### 4. Dropped on an existing row
   *
   * | Property          | Details                                                                                                                                     |
   * | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `beforeCellId`    | Identifier of the cell that, after the drop operation, ends located after the dropped control. An empty string if dropped as the last cell. |
   * | `targetRowId`     | Identifier of the row where the control was dropped                                                                                         |
   *
   */
  @Event() moveCompleted: EventEmitter;

  /**
   * Fired when a control (that wasn't already inside the layout editor) has been dropped on
   * a valid drop target (for example, a control from a toolbox or an object from the knowledge base navigator)
   *
   * ##### Dragging a control
   *
   * If a control is being dragged, the dataTransfer property of the event must have the following format:
   *
   * `"GX_DASHBOARD_ADDELEMENT,[GeneXus type of control]"`
   *
   * where:
   *
   * * `GX_DASHBOARD_ADDELEMENT` is the type of action
   * * `[GeneXus type of control]` is the type of control that's been added. This value can have any value and will be passed as part of the information sent as part of the event.
   *
   * ##### Dragging a KB object
   *
   * If a KB object is being dragged, the dataTransfer property of the event must contain the name of the KB object.
   *
   * ##### Dropped control information
   *
   * An object containing information of the add operation is sent in the `detail` property of the event object.
   *
   * If a KB object was dropped, the following properties are set:
   *
   * | Property          | Details                                                                                                                                     |
   * | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `kbObjectName`    | Name of the GeneXus object                                                                                                               |
   *
   * If control was dropped, the following properties are set.
   *
   * | Property          | Details                                                                                                                                     |
   * | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `elementType`     | The type of the control that's been added and was received as the `[GeneXus type of control]` in the dataTransfer of the drop operation     |
   *
   * Depending on where the control was dropped, additional information will be provided and different properties will be set. There are four possible cases:
   *
   * 1. Dropped on an empty container or in the last row of a container
   * 2. Dropped on a new row of a non empty container
   * 3. Dropped on an existing empty cell
   * 4. Dropped on an existing row
   *
   *
   * ###### 1. Dropped on an empty container or on a new row that will be the last row of a container
   *
   * | Property          | Details                                                                                                                                     |
   * | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `containerId`     | Identifier of the container where the control was dropped                                                                                   |
   *
   * ###### 2. Dropped on a new row of a non empty container
   *
   * | Property          | Details                                                                                                                                     |
   * | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `beforeRowId`     | Identifier of the row next to the row where the control was dropped. An empty string if dropped in the last row or on an empty container.   |
   *
   * ###### 3. Dropped on an existing empty cell
   *
   * | Property      | Details                                                                                                          |
   * | ------------- | ---------------------------------------------------------------------------------------------------------------- |
   * | `targetCellId`| Identifier of the cell where the control was dropped |
   *
   *  ###### 4. Dropped on an existing row
   *
   * | Property          | Details                                                                                                                                     |
   * | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `beforeCelllId`   | Identifier of the cell that, after the drop operation, ends located after the dropped control. An empty string if dropped as the last cell. |
   * | `targetRowId`     | Identifier of the row where the control was dropped                                                                                         |
   *
   *
   */
  @Event() controlAdded: EventEmitter;

  /**
   * Fired when a control has been removed from the layout
   *
   * An object containing information of the add operation is sent in the `detail` property of the event object
   *
   * | Property           | Details                                                     |
   * | ------------------ | ----------------------------------------------------------- |
   * | `controls`         | An array containing the identifiers of the removed controls |
   *
   */
  @Event() controlRemoved: EventEmitter;

  /**
   * Fired when the selection has been changed
   *
   * An object containing information of the select operation is sent in the `detail` property of the event object
   *
   * | Property       | Details                                                      |
   * | -------------- | ------------------------------------------------------------ |
   * | `controls`     | An array containing the identifiers of the selected controls |
   *
   */
  @Event() controlSelected: EventEmitter;

  private transitElement: HTMLDivElement;
  private dragLeaveTimeoutId: number;
  private lastCellDragLeft: HTMLElement;
  private ghostElement: HTMLDivElement;

  componentDidLoad() {
    this.initDragAndDrop();
    this.setControlsDraggable();
  }

  private initDragAndDrop() {
    this.element.addEventListener(
      "dragstart",
      this.handleControlDragStart.bind(this)
    );

    this.element.addEventListener(
      "dragend",
      this.handleControlDragEnd.bind(this)
    );

    this.element.addEventListener(
      "dragleave",
      this.handleControlDragLeave.bind(this)
    );

    this.element.addEventListener("drop", this.handleControlDrop.bind(this));

    this.element.addEventListener(
      "dragover",
      this.handleControlOver.bind(this)
    );
  }

  private handleControlDragStart(event: DragEvent) {
    const dt = event.dataTransfer;
    const evtTarget = event.target as HTMLElement;
    const cell = findParentCell(evtTarget);
    cell.setAttribute("data-gx-le-dragged", "true");
    const { cellId } = getCellData(cell);
    dt.setData("text/plain", `gx-le-move-operation,${cellId}`);

    const ghost = this.createGhostElement(evtTarget);
    event.dataTransfer.setDragImage(ghost, 0, 0);

    dt.dropEffect = "copy";
  }

  private handleControlDragEnd() {
    this.element.removeAttribute("data-gx-le-dragging");
    this.restoreAfterDragDrop();
  }

  private handleControlDragLeave(event: DragEvent) {
    const evtTarget = event.target as HTMLElement;
    const targetCell = findValidDropTarget(evtTarget);
    if (!targetCell) {
      return;
    }

    this.lastCellDragLeft = targetCell;

    this.dragLeaveTimeoutId = window.setTimeout(() => {
      this.clearActiveTarget(targetCell);
      this.removeTransitElement();
    }, 50);
  }

  private removeTransitElement() {
    const transitElement = this.getTransitElement();
    if (transitElement.parentElement) {
      transitElement.parentElement.removeChild(transitElement);
    }
  }

  private clearActiveTarget(targetCell: HTMLElement) {
    targetCell.removeAttribute("data-gx-le-active-target");
  }

  private handleControlOver(event: DragEvent) {
    this.element.setAttribute("data-gx-le-dragging", "");

    const evtTarget = event.target as HTMLElement;
    const targetCell = findValidDropTarget(evtTarget);
    if (!targetCell) {
      return;
    }

    if (targetCell.matches("[data-gx-le-dragged] [data-gx-le-drop-area]")) {
      return;
    }

    if (targetCell.matches("[data-gx-le-dragged] [data-gx-le-placeholder]")) {
      return;
    }

    event.preventDefault();

    if (this.lastCellDragLeft === targetCell) {
      window.clearTimeout(this.dragLeaveTimeoutId);
    }

    const transitElement = this.getTransitElement();

    if (
      this.getTransitElementPosition(targetCell, event) === DropPosition.After
    ) {
      targetCell.appendChild(transitElement);
    } else {
      targetCell.insertBefore(transitElement, targetCell.firstElementChild);
    }

    const { dropArea: direction } = getCellData(targetCell);

    const position =
      targetCell.children.length === 1
        ? "empty"
        : transitElement.nextElementSibling
        ? direction === "vertical"
          ? "top"
          : "left"
        : direction === "vertical"
        ? "bottom"
        : "right";
    targetCell.setAttribute("data-gx-le-active-target", position);
  }

  private getTransitElementPosition(
    targetCell: HTMLElement,
    event: DragEvent
  ): DropPosition {
    const boundingRect = targetCell.getBoundingClientRect();
    const boundingRectWidth = boundingRect.right - boundingRect.left;
    return event.clientX > boundingRect.left + boundingRectWidth / 2
      ? DropPosition.After
      : DropPosition.Before;
  }

  private getTransitElement(): HTMLDivElement {
    if (!this.transitElement) {
      this.transitElement = document.createElement("div");
      this.transitElement.setAttribute("data-gx-le-transit-element", "");
    }

    return this.transitElement;
  }

  private handleControlDrop(event: DragEvent) {
    const targetCell = findValidDropTarget(event.target as HTMLElement);

    if (!targetCell) {
      return;
    }

    event.preventDefault();

    const eventData = this.getEventDataForDropAction(
      targetCell,
      this.transitElement
    );

    const {
      sourceCellId,
      kbObjectName,
      elementType
    } = this.parseDropEventDataTransfer(event);

    if (sourceCellId) {
      const sourceCell = this.element.querySelector(
        `[data-gx-le-cell-id="${sourceCellId}"]`
      ) as HTMLElement;

      if (sourceCell) {
        const { rowId: sourceRowId } = getCellData(sourceCell);
        this.emitDropEvent(this.moveCompleted, {
          ...eventData,
          sourceCellId,
          sourceRowId
        });
      }
    } else {
      if (kbObjectName) {
        this.emitDropEvent(this.controlAdded, {
          ...eventData,
          kbObjectName
        });
      } else if (elementType) {
        this.emitDropEvent(this.controlAdded, {
          ...eventData,
          elementType
        });
      }
    }
  }

  parseDropEventDataTransfer(event: DragEvent): any {
    const evtDataTransfer = event.dataTransfer.getData("text/plain");
    const [dataTransferFirst, dataTransferSecond] = evtDataTransfer.split(",");

    if (dataTransferFirst === "gx-le-move-operation") {
      return {
        sourceCellId: dataTransferSecond
      };
    } else {
      if (dataTransferSecond === undefined) {
        return {
          kbObjectName: dataTransferFirst
        };
      } else if (
        dataTransferSecond !== undefined &&
        dataTransferFirst === "GX_DASHBOARD_ADDELEMENT"
      ) {
        return {
          elementType: dataTransferSecond
        };
      }
    }
  }

  private getEventDataForDropAction(
    targetCell: HTMLElement,
    droppedEl: HTMLElement
  ) {
    let eventData;

    const { placeholderType, nextRowId } = getDropTargetData(targetCell);
    if (placeholderType === "row") {
      if (isEmptyContainerDrop(targetCell)) {
        // Dropped on an empty container
        eventData = {
          containerId: getControlId(targetCell.parentElement)
        };
      } else {
        // Dropped on a new row
        const beforeRowId = nextRowId;
        if (beforeRowId) {
          eventData = {
            beforeRowId
          };
        } else {
          eventData = {
            containerId: getControlId(targetCell.parentElement)
          };
        }
      }
    } else {
      const { rowId: targetRowId } = getCellData(targetCell);
      // Dropped on an existing row
      if (targetCell.children.length === 1) {
        // Dropped on an empty cell
        const { cellId: targetCellId } = getCellData(targetCell);
        eventData = {
          targetCellId
        };
      } else {
        // Dropped on a non-empty cell
        let beforeCellId = null;
        if (droppedEl.nextElementSibling) {
          beforeCellId = getCellData(targetCell).cellId;
        } else {
          if (targetCell.nextElementSibling) {
            const nextElementData = getCellData(
              targetCell.nextElementSibling as HTMLElement
            );
            if (targetRowId === nextElementData.rowId) {
              beforeCellId = nextElementData.cellId;
            }
          }
        }
        eventData = {
          beforeCellId,
          targetRowId
        };
      }
    }
    return eventData;
  }

  private emitDropEvent(emitter: EventEmitter, data: any) {
    this.restoreAfterDragDrop();
    emitter.emit.call(this, data);
  }

  private getDropAreas() {
    return Array.from(
      this.element.querySelectorAll(
        "[data-gx-le-drop-area], [data-gx-le-placeholder]"
      )
    );
  }

  private createGhostElement(fromElement: HTMLElement) {
    this.ghostElement = document.createElement("div");
    this.ghostElement.appendChild(fromElement.cloneNode(true));
    this.ghostElement.style.position = "fixed";
    this.ghostElement.style.top = "-100vh";
    this.ghostElement.style.left = "-100vh";
    document.body.appendChild(this.ghostElement);
    return this.ghostElement;
  }

  private removeGhostElement(): any {
    if (this.ghostElement) {
      this.ghostElement.parentElement.removeChild(this.ghostElement);
      this.ghostElement = null;
    }
    return this.ghostElement;
  }

  componentWillUpdate() {
    this.restoreAfterDragDrop();
  }

  componentDidUpdate() {
    this.setControlsDraggable();
  }

  private restoreAfterDragDrop() {
    this.removeTransitElement();
    this.removeGhostElement();
    this.removeAttributeFromElements("data-gx-le-active-target");
    this.removeAttributeFromElements("data-gx-le-dragged");
  }

  private removeAttributeFromElements(attributeName: string) {
    const activeTargets = Array.from(
      this.element.querySelectorAll(`[${attributeName}]`)
    );
    for (const target of activeTargets) {
      target.removeAttribute(attributeName);
    }
  }

  private setControlsDraggable() {
    this.getDropAreas().forEach((el: HTMLElement) => {
      const controlElement = el.firstElementChild;
      if (controlElement) {
        controlElement.setAttribute("draggable", "true");
      }
    });
  }

  @Listen("click")
  @Listen("contextmenu")
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    this.handleSelection(target, event.ctrlKey);
    const selCell = findParentCell(target);

    if (selCell) {
      selCell.focus();
    }
  }

  private handleSelection(target: HTMLElement, add: boolean) {
    let selectedControlId = getControlId(target);

    if (!selectedControlId) {
      const selCell = findParentCell(target);
      if (selCell) {
        if (selCell.firstElementChild) {
          selectedControlId = getControlId(
            selCell.firstElementChild as HTMLElement
          );
        }

        if (!selectedControlId) {
          const { cellId: selectedCellId } = getCellData(selCell);
          selectedControlId = selectedCellId;
        }
      }
    }
    if (!selectedControlId) {
      selectedControlId = "";
    }

    this.updateSelection(selectedControlId, add);
  }

  private updateSelection(selectedControlId: string, add: boolean) {
    this.selectedControls = add
      ? [...this.selectedControls, selectedControlId]
      : [selectedControlId];
  }

  @Listen("keydown")
  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const { cellId } = getCellData(target);
    if (cellId) {
      switch (event.key) {
        case "Delete":
          this.handleDelete();
          break;
        case " ":
          this.handleSelection(
            target.firstElementChild as HTMLElement,
            event.ctrlKey
          );
          event.preventDefault();
          break;
      }
    }
  }

  private handleDelete() {
    this.controlRemoved.emit({
      controls: this.selectedControls
    });
  }

  @Listen("mouseover", { passive: true })
  onMouseOver(event: MouseEvent) {
    const cell = findParentCell(event.target as HTMLElement);
    if (cell) {
      this.clearHighglighting();
      cell.setAttribute("data-gx-le-highlighted", "");
    }
  }

  @Listen("mouseout", { passive: true })
  onMouseOut() {
    this.clearHighglighting();
  }

  private clearHighglighting() {
    const highlightedElement = this.element.querySelector(
      "[data-gx-le-highlighted]"
    );
    if (highlightedElement) {
      highlightedElement.removeAttribute("data-gx-le-highlighted");
    }
  }

  render() {
    if (this.model && this.model.layout) {
      const context = {
        selectedControls: this.selectedControls
      };
      const isSelected =
        this.selectedControls.find(id => id === "") !== undefined ||
        isCellSelected(this.model.layout, context);
      this.element.setAttribute("data-gx-le-selected", isSelected.toString());
      return (
        <div>
          {controlResolver(this.model.layout, context)}
          <gx-layout-editor-placeholder
            data-gx-le-external
            data-gx-le-placeholder="row"
            style={{
              display: "none"
            }}
          >
            <div data-gx-le-external-transit />
          </gx-layout-editor-placeholder>
        </div>
      );
    }
  }
}

enum DropPosition {
  Before = "before",
  After = "after"
}

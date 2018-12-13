import {
  findParentCell,
  findParentContainer,
  findValidDropTarget,
  getCellData,
  getControlId,
  getDropTargetData,
  isEmptyContainerDrop
} from "./layout-editor-helpers";
import { EventEmitter } from "@stencil/core";

export class LayoutEditorDragDrop {
  constructor(
    private element: HTMLGxLayoutEditorElement,
    private moveCompleted: EventEmitter,
    private controlAdded: EventEmitter
  ) {}

  private transitElement: HTMLDivElement;
  private dragLeaveTimeoutId: number;
  private lastCellDragLeft: HTMLElement;
  private ghostElement: HTMLDivElement;

  public initialize() {
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

    this.setControlsDraggable();
  }

  private handleControlDragStart(event: DragEvent) {
    const dt = event.dataTransfer;
    const evtTarget = event.target as HTMLElement;
    const cell = findParentCell(evtTarget);
    cell.setAttribute("data-gx-le-dragged", "true");
    const { cellId } = getCellData(cell);
    const controlId = getControlId(cell.firstElementChild) || "";
    dt.setData(
      "text/plain",
      `${MOVE_OPERATION_NAME},${cellId || ""},${controlId}`
    );

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

    if (!this.isDraggedControlAccepted(targetCell)) {
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

  private parseDropEventDataTransfer(event: DragEvent): IDragOperationData {
    const evtDataTransfer = event.dataTransfer.getData("text/plain");
    const [
      dataTransferFirst,
      dataTransferSecond,
      dataTransferThird
    ] = evtDataTransfer.split(",");

    if (dataTransferFirst === MOVE_OPERATION_NAME) {
      return {
        controlId: dataTransferThird,
        sourceCellId: dataTransferSecond
      };
    } else {
      if (dataTransferSecond === undefined) {
        return {
          kbObjectName: dataTransferFirst
        };
      } else if (
        dataTransferSecond !== undefined &&
        dataTransferFirst === GX_ADD_OPERATION_NAME
      ) {
        return {
          elementType: dataTransferSecond
        };
      }
    }
  }

  private isDraggedControlAccepted(targetCell: HTMLElement) {
    const draggedControl = this.element.querySelector(
      "[data-gx-le-dragged='true'] > [data-gx-le-control-id]"
    );

    const acceptedTagNamesAttr = targetCell.getAttribute(
      "data-gx-le-accepted-tag-names"
    );

    if (draggedControl && acceptedTagNamesAttr) {
      return acceptedTagNamesAttr.includes(
        draggedControl.tagName.toLowerCase()
      );
    }
    return true;
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

    const eventData = this.getEventDataForDropAction(
      targetCell,
      this.transitElement
    );

    const {
      sourceCellId,
      kbObjectName,
      elementType,
      controlId
    } = this.parseDropEventDataTransfer(event);

    if (!this.isDroppedControlAccepted(targetCell, elementType)) {
      return;
    }

    event.preventDefault();

    if (sourceCellId) {
      const sourceCell = this.element.querySelector(
        `[data-gx-le-cell-id="${sourceCellId}"]`
      ) as HTMLElement;

      if (sourceCell) {
        const { rowId: sourceRowId } = getCellData(sourceCell);
        this.emitDropEvent(this.moveCompleted, {
          controlId,
          ...eventData,
          sourceCellId,
          sourceRowId
        });
      }
    } else {
      if (controlId) {
        this.emitDropEvent(this.moveCompleted, {
          ...eventData,
          controlId
        });
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
          containerId: getControlId(findParentContainer(targetCell))
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
            containerId: getControlId(findParentContainer(targetCell))
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
        const targetControlId = getControlId(targetCell);
        if (targetControlId) {
          // Dropped on a control (this happens when the container doesn't handle rows nor cells)
          eventData = {
            containerId: getControlId(findParentContainer(targetCell))
          };
          if (droppedEl.nextElementSibling) {
            eventData.beforeControlId = targetControlId;
          }
        } else {
          // Dropped on a non-empty cell
          let beforeCellId = null;
          if (droppedEl.nextElementSibling) {
            beforeCellId = getCellData(targetCell).cellId;
          } else {
            if (targetCell.nextElementSibling) {
              const nextElementData = getCellData(
                targetCell.nextElementSibling
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

  private isDroppedControlAccepted(
    targetCell: HTMLElement,
    elementType: string
  ) {
    if (!elementType) {
      return false;
    }

    const acceptedElementTypes = targetCell.getAttribute(
      "data-gx-le-accepted-element-types"
    );

    if (acceptedElementTypes) {
      return acceptedElementTypes.includes(elementType);
    }
    return true;
  }

  private createGhostElement(fromElement: HTMLElement) {
    this.ghostElement = document.createElement("div");
    const clonedElement = fromElement.cloneNode(true);
    this.copyCustomProperties(fromElement, clonedElement);
    this.ghostElement.appendChild(clonedElement);
    this.ghostElement.style.position = "fixed";
    this.ghostElement.style.top = "-100vh";
    this.ghostElement.style.left = "-100vh";
    document.body.appendChild(this.ghostElement);
    return this.ghostElement;
  }

  private copyCustomProperties(sourceElement: any, targetElement: any) {
    targetElement.model = sourceElement.model;
    targetElement.context = sourceElement.context;
  }

  private removeGhostElement(): any {
    if (this.ghostElement) {
      this.ghostElement.parentElement.removeChild(this.ghostElement);
      this.ghostElement = null;
    }
    return this.ghostElement;
  }

  public restoreAfterDragDrop() {
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

  public update() {
    this.setControlsDraggable();
  }

  private setControlsDraggable() {
    this.getDropAreas().forEach((el: HTMLElement) => {
      const controlElement = el.firstElementChild;
      if (controlElement) {
        controlElement.setAttribute("draggable", "true");
      }
    });
  }
}

interface IDragOperationData {
  controlId?: string;
  elementType?: string;
  kbObjectName?: string;
  sourceCellId?: string;
}

enum DropPosition {
  Before = "before",
  After = "after"
}

const MOVE_OPERATION_NAME = "gx-le-move-operation";
const GX_ADD_OPERATION_NAME = "GX_DASHBOARD_ADDELEMENT";

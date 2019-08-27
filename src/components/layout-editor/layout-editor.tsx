import {
  Component,
  Element,
  Event,
  EventEmitter,
  Listen,
  Prop,
  Watch,
  h
} from "@stencil/core";
import {
  findControlWrapper,
  findParentCell,
  getCellData,
  getControlId
} from "./layout-editor-helpers";

import { Fragment } from "../common/util";
import { LayoutEditorDragDrop } from "./layout-editor-drag-drop";
import { controlResolver } from "./layout-editor-control-resolver";
import { transform } from "../metadata/transform";

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

  dragDrop: LayoutEditorDragDrop;

  /**
   * The abstract form model object
   */
  @Prop() model: GeneXusAbstractLayout.Model;

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
   * Regardless where the control was dropped, the detail object will contain information about the source row,
   * the source cell (if available), and the id of the dropped control:
   *
   * | Property         | Details                                                                                                          |
   * | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
   * | `sourceCellId`   | Identifier of the source cell, if available                                                                      |
   * | `sourceRowId`    | Identifier of the source row, if available                                                                       |
   * | `controlId`      | Identifier of the control                                                                                        |
   *
   * Depending on where the control was dropped, additional information will be provided and different properties will be set. There are five possible cases:
   *
   * 1. Dropped on an empty container or on a new row that will be the last row of a container
   * 2. Dropped on a new row of a non empty container
   * 3. Dropped on an existing empty cell
   * 4. Dropped on an existing row
   * 5. Dropped on a non empty container control that doesn't handle cells nor rows
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
   *  ###### 5. Dropped on a non empty container control that doesn't handle cells nor rows
   *
   * | Property          | Details                                                                                                                                           |
   * | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `beforeControlId` | Identifier of the control that, after the drop operation, ends located after the dropped control. An empty string if dropped as the last control. |
   * | `containerId`     | Identifier of the container where the control was dropped                                                                                         |
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
   * 5. Dropped on a non empty container control that doesn't handle cells nor rows
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
   *  ###### 5. Dropped on a non empty container control that doesn't handle cells nor rows
   *
   * | Property          | Details                                                                                                                                           |
   * | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `beforeControlId` | Identifier of the control that, after the drop operation, ends located after the dropped control. An empty string if dropped as the last control. |
   * | `containerId`     | Identifier of the container where the control was dropped                                                                                         |
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

  componentDidLoad() {
    this.dragDrop = new LayoutEditorDragDrop(
      this.element as HTMLGxLayoutEditorElement,
      this.moveCompleted,
      this.controlAdded
    );
    this.dragDrop.initialize();
  }

  componentWillUpdate() {
    this.dragDrop.restoreAfterDragDrop();
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
    const selectedControlId = getControlId(findControlWrapper(target));

    this.updateSelection(selectedControlId, add);
  }

  private updateSelection(selectedControlId: string, add: boolean) {
    if (add && selectedControlId !== "") {
      this.selectedControls = this.selectedControls.includes(selectedControlId)
        ? this.selectedControls.filter(id => id !== selectedControlId)
        : [...this.selectedControls, selectedControlId];
    } else if (!add) {
      this.selectedControls =
        selectedControlId === "" ? [] : [selectedControlId];
    }
  }

  @Listen("keydown")
  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    switch (event.key) {
      case "Delete":
        this.handleDelete();
        break;
      case " ":
        const { cellId } = getCellData(target);
        const controlId = getControlId(target);
        if (cellId || controlId) {
          this.handleSelection(
            cellId ? (target.firstElementChild as HTMLElement) : target,
            event.ctrlKey
          );
          event.preventDefault();
        }
        break;
    }
  }

  private handleDelete() {
    this.controlRemoved.emit({
      controls: this.selectedControls
    });
  }

  render() {
    if (this.model && this.model.layout) {
      const model = transform(this.model);

      const context = {
        selectedControls: this.selectedControls
      };

      return [
        <gx-le-tool-highlight-controller
          editor={this}
          selection={this.selectedControls}
        />,
        <Fragment>
          {controlResolver(model.layout, context)}
          <gx-layout-editor-placeholder
            data-gx-le-external
            data-gx-le-placeholder="row"
            style={{
              display: "none"
            }}
          >
            <div data-gx-le-external-transit />
          </gx-layout-editor-placeholder>
        </Fragment>
      ];
    }
  }
}

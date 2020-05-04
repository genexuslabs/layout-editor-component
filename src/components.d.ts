/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ResolverContext, } from "./components/layout-editor/layout-editor-control-resolver";
import { LayoutEditorToolDimensionType, LayoutEditorToolSelectEvent, } from "./components/layout-editor-tool/layout-editor-tool-commons";
import { LayoutEditor, } from "./components/layout-editor/layout-editor";
export namespace Components {
    interface GxLayoutEditor {
        /**
          * The abstract form model object
         */
        "model": GeneXusAbstractLayout.Model;
        /**
          * Array with the identifiers of the selected controls. If empty the whole layout-editor is marked as selected.
         */
        "selectedControls": string[];
    }
    interface GxLayoutEditorPlaceholder {
    }
    interface GxLayoutEditorSample {
    }
    interface GxLeAction {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
    }
    interface GxLeCanvasTable {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
    }
    interface GxLeComponent {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
    }
    interface GxLeData {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
    }
    interface GxLeDefault {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
    }
    interface GxLeErrorviewer {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
    }
    interface GxLeFlexTable {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
    }
    interface GxLeFreestyleGrid {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
    }
    interface GxLeGroup {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
    }
    interface GxLeHorizontalRule {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
    }
    interface GxLeHyperlink {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
    }
    interface GxLeImage {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
    }
    interface GxLeResponsiveTable {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
    }
    interface GxLeSection {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
    }
    interface GxLeSimpleGrid {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
    }
    interface GxLeTab {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
        "tabItemSelectedId": string;
    }
    interface GxLeTabularTable {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
    }
    interface GxLeTextblock {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
    }
    interface GxLeToolBar {
        "control": HTMLElement;
    }
    interface GxLeToolBox {
        "control": HTMLElement;
    }
    interface GxLeToolBreadcrumb {
        "control": HTMLElement;
    }
    interface GxLeToolDimension {
        "control": HTMLElement;
        "type": LayoutEditorToolDimensionType;
    }
    interface GxLeToolDrag {
        "control": HTMLElement;
    }
    interface GxLeToolHighlightController {
        "dragTarget": string;
        "editor": LayoutEditor;
        "selection": string[];
    }
    interface GxLeToolIdentity {
        "control": HTMLElement;
    }
    interface GxLeToolSelection {
        "changeHighlight": boolean;
        "changeSmooth": boolean;
        "control": HTMLElement;
        "loadBar": boolean;
        "loadBox": boolean;
        "loadDimension": boolean;
        "preview": boolean;
    }
    interface GxLeUserControl {
        "context": ResolverContext;
        "model": GeneXusAbstractLayout.Cell;
    }
}
declare global {
    interface HTMLGxLayoutEditorElement extends Components.GxLayoutEditor, HTMLStencilElement {
    }
    var HTMLGxLayoutEditorElement: {
        prototype: HTMLGxLayoutEditorElement;
        new (): HTMLGxLayoutEditorElement;
    };
    interface HTMLGxLayoutEditorPlaceholderElement extends Components.GxLayoutEditorPlaceholder, HTMLStencilElement {
    }
    var HTMLGxLayoutEditorPlaceholderElement: {
        prototype: HTMLGxLayoutEditorPlaceholderElement;
        new (): HTMLGxLayoutEditorPlaceholderElement;
    };
    interface HTMLGxLayoutEditorSampleElement extends Components.GxLayoutEditorSample, HTMLStencilElement {
    }
    var HTMLGxLayoutEditorSampleElement: {
        prototype: HTMLGxLayoutEditorSampleElement;
        new (): HTMLGxLayoutEditorSampleElement;
    };
    interface HTMLGxLeActionElement extends Components.GxLeAction, HTMLStencilElement {
    }
    var HTMLGxLeActionElement: {
        prototype: HTMLGxLeActionElement;
        new (): HTMLGxLeActionElement;
    };
    interface HTMLGxLeCanvasTableElement extends Components.GxLeCanvasTable, HTMLStencilElement {
    }
    var HTMLGxLeCanvasTableElement: {
        prototype: HTMLGxLeCanvasTableElement;
        new (): HTMLGxLeCanvasTableElement;
    };
    interface HTMLGxLeComponentElement extends Components.GxLeComponent, HTMLStencilElement {
    }
    var HTMLGxLeComponentElement: {
        prototype: HTMLGxLeComponentElement;
        new (): HTMLGxLeComponentElement;
    };
    interface HTMLGxLeDataElement extends Components.GxLeData, HTMLStencilElement {
    }
    var HTMLGxLeDataElement: {
        prototype: HTMLGxLeDataElement;
        new (): HTMLGxLeDataElement;
    };
    interface HTMLGxLeDefaultElement extends Components.GxLeDefault, HTMLStencilElement {
    }
    var HTMLGxLeDefaultElement: {
        prototype: HTMLGxLeDefaultElement;
        new (): HTMLGxLeDefaultElement;
    };
    interface HTMLGxLeErrorviewerElement extends Components.GxLeErrorviewer, HTMLStencilElement {
    }
    var HTMLGxLeErrorviewerElement: {
        prototype: HTMLGxLeErrorviewerElement;
        new (): HTMLGxLeErrorviewerElement;
    };
    interface HTMLGxLeFlexTableElement extends Components.GxLeFlexTable, HTMLStencilElement {
    }
    var HTMLGxLeFlexTableElement: {
        prototype: HTMLGxLeFlexTableElement;
        new (): HTMLGxLeFlexTableElement;
    };
    interface HTMLGxLeFreestyleGridElement extends Components.GxLeFreestyleGrid, HTMLStencilElement {
    }
    var HTMLGxLeFreestyleGridElement: {
        prototype: HTMLGxLeFreestyleGridElement;
        new (): HTMLGxLeFreestyleGridElement;
    };
    interface HTMLGxLeGroupElement extends Components.GxLeGroup, HTMLStencilElement {
    }
    var HTMLGxLeGroupElement: {
        prototype: HTMLGxLeGroupElement;
        new (): HTMLGxLeGroupElement;
    };
    interface HTMLGxLeHorizontalRuleElement extends Components.GxLeHorizontalRule, HTMLStencilElement {
    }
    var HTMLGxLeHorizontalRuleElement: {
        prototype: HTMLGxLeHorizontalRuleElement;
        new (): HTMLGxLeHorizontalRuleElement;
    };
    interface HTMLGxLeHyperlinkElement extends Components.GxLeHyperlink, HTMLStencilElement {
    }
    var HTMLGxLeHyperlinkElement: {
        prototype: HTMLGxLeHyperlinkElement;
        new (): HTMLGxLeHyperlinkElement;
    };
    interface HTMLGxLeImageElement extends Components.GxLeImage, HTMLStencilElement {
    }
    var HTMLGxLeImageElement: {
        prototype: HTMLGxLeImageElement;
        new (): HTMLGxLeImageElement;
    };
    interface HTMLGxLeResponsiveTableElement extends Components.GxLeResponsiveTable, HTMLStencilElement {
    }
    var HTMLGxLeResponsiveTableElement: {
        prototype: HTMLGxLeResponsiveTableElement;
        new (): HTMLGxLeResponsiveTableElement;
    };
    interface HTMLGxLeSectionElement extends Components.GxLeSection, HTMLStencilElement {
    }
    var HTMLGxLeSectionElement: {
        prototype: HTMLGxLeSectionElement;
        new (): HTMLGxLeSectionElement;
    };
    interface HTMLGxLeSimpleGridElement extends Components.GxLeSimpleGrid, HTMLStencilElement {
    }
    var HTMLGxLeSimpleGridElement: {
        prototype: HTMLGxLeSimpleGridElement;
        new (): HTMLGxLeSimpleGridElement;
    };
    interface HTMLGxLeTabElement extends Components.GxLeTab, HTMLStencilElement {
    }
    var HTMLGxLeTabElement: {
        prototype: HTMLGxLeTabElement;
        new (): HTMLGxLeTabElement;
    };
    interface HTMLGxLeTabularTableElement extends Components.GxLeTabularTable, HTMLStencilElement {
    }
    var HTMLGxLeTabularTableElement: {
        prototype: HTMLGxLeTabularTableElement;
        new (): HTMLGxLeTabularTableElement;
    };
    interface HTMLGxLeTextblockElement extends Components.GxLeTextblock, HTMLStencilElement {
    }
    var HTMLGxLeTextblockElement: {
        prototype: HTMLGxLeTextblockElement;
        new (): HTMLGxLeTextblockElement;
    };
    interface HTMLGxLeToolBarElement extends Components.GxLeToolBar, HTMLStencilElement {
    }
    var HTMLGxLeToolBarElement: {
        prototype: HTMLGxLeToolBarElement;
        new (): HTMLGxLeToolBarElement;
    };
    interface HTMLGxLeToolBoxElement extends Components.GxLeToolBox, HTMLStencilElement {
    }
    var HTMLGxLeToolBoxElement: {
        prototype: HTMLGxLeToolBoxElement;
        new (): HTMLGxLeToolBoxElement;
    };
    interface HTMLGxLeToolBreadcrumbElement extends Components.GxLeToolBreadcrumb, HTMLStencilElement {
    }
    var HTMLGxLeToolBreadcrumbElement: {
        prototype: HTMLGxLeToolBreadcrumbElement;
        new (): HTMLGxLeToolBreadcrumbElement;
    };
    interface HTMLGxLeToolDimensionElement extends Components.GxLeToolDimension, HTMLStencilElement {
    }
    var HTMLGxLeToolDimensionElement: {
        prototype: HTMLGxLeToolDimensionElement;
        new (): HTMLGxLeToolDimensionElement;
    };
    interface HTMLGxLeToolDragElement extends Components.GxLeToolDrag, HTMLStencilElement {
    }
    var HTMLGxLeToolDragElement: {
        prototype: HTMLGxLeToolDragElement;
        new (): HTMLGxLeToolDragElement;
    };
    interface HTMLGxLeToolHighlightControllerElement extends Components.GxLeToolHighlightController, HTMLStencilElement {
    }
    var HTMLGxLeToolHighlightControllerElement: {
        prototype: HTMLGxLeToolHighlightControllerElement;
        new (): HTMLGxLeToolHighlightControllerElement;
    };
    interface HTMLGxLeToolIdentityElement extends Components.GxLeToolIdentity, HTMLStencilElement {
    }
    var HTMLGxLeToolIdentityElement: {
        prototype: HTMLGxLeToolIdentityElement;
        new (): HTMLGxLeToolIdentityElement;
    };
    interface HTMLGxLeToolSelectionElement extends Components.GxLeToolSelection, HTMLStencilElement {
    }
    var HTMLGxLeToolSelectionElement: {
        prototype: HTMLGxLeToolSelectionElement;
        new (): HTMLGxLeToolSelectionElement;
    };
    interface HTMLGxLeUserControlElement extends Components.GxLeUserControl, HTMLStencilElement {
    }
    var HTMLGxLeUserControlElement: {
        prototype: HTMLGxLeUserControlElement;
        new (): HTMLGxLeUserControlElement;
    };
    interface HTMLElementTagNameMap {
        "gx-layout-editor": HTMLGxLayoutEditorElement;
        "gx-layout-editor-placeholder": HTMLGxLayoutEditorPlaceholderElement;
        "gx-layout-editor-sample": HTMLGxLayoutEditorSampleElement;
        "gx-le-action": HTMLGxLeActionElement;
        "gx-le-canvas-table": HTMLGxLeCanvasTableElement;
        "gx-le-component": HTMLGxLeComponentElement;
        "gx-le-data": HTMLGxLeDataElement;
        "gx-le-default": HTMLGxLeDefaultElement;
        "gx-le-errorviewer": HTMLGxLeErrorviewerElement;
        "gx-le-flex-table": HTMLGxLeFlexTableElement;
        "gx-le-freestyle-grid": HTMLGxLeFreestyleGridElement;
        "gx-le-group": HTMLGxLeGroupElement;
        "gx-le-horizontal-rule": HTMLGxLeHorizontalRuleElement;
        "gx-le-hyperlink": HTMLGxLeHyperlinkElement;
        "gx-le-image": HTMLGxLeImageElement;
        "gx-le-responsive-table": HTMLGxLeResponsiveTableElement;
        "gx-le-section": HTMLGxLeSectionElement;
        "gx-le-simple-grid": HTMLGxLeSimpleGridElement;
        "gx-le-tab": HTMLGxLeTabElement;
        "gx-le-tabular-table": HTMLGxLeTabularTableElement;
        "gx-le-textblock": HTMLGxLeTextblockElement;
        "gx-le-tool-bar": HTMLGxLeToolBarElement;
        "gx-le-tool-box": HTMLGxLeToolBoxElement;
        "gx-le-tool-breadcrumb": HTMLGxLeToolBreadcrumbElement;
        "gx-le-tool-dimension": HTMLGxLeToolDimensionElement;
        "gx-le-tool-drag": HTMLGxLeToolDragElement;
        "gx-le-tool-highlight-controller": HTMLGxLeToolHighlightControllerElement;
        "gx-le-tool-identity": HTMLGxLeToolIdentityElement;
        "gx-le-tool-selection": HTMLGxLeToolSelectionElement;
        "gx-le-user-control": HTMLGxLeUserControlElement;
    }
}
declare namespace LocalJSX {
    interface GxLayoutEditor {
        /**
          * The abstract form model object
         */
        "model"?: GeneXusAbstractLayout.Model;
        /**
          * Fired when a control (that wasn't already inside the layout editor) has been dropped on a valid drop target (for example, a control from a toolbox or an object from the knowledge base navigator)  ##### Dragging a control  If a control is being dragged, the dataTransfer property of the event must have the following format:  `"GX_DASHBOARD_ADDELEMENT,[GeneXus type of control]"`  where:  * `GX_DASHBOARD_ADDELEMENT` is the type of action * `[GeneXus type of control]` is the type of control that's been added. This value can have any value and will be passed as part of the information sent as part of the event.  ##### Dragging a KB object  If a KB object is being dragged, the dataTransfer property of the event must contain the name of the KB object.  ##### Dropped control information  An object containing information of the add operation is sent in the `detail` property of the event object.  If a KB object was dropped, the following properties are set:  | Property          | Details                                                                                                                                     | | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | | `kbObjectName`    | Name of the GeneXus object                                                                                                               |  If control was dropped, the following properties are set.  | Property          | Details                                                                                                                                     | | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | | `elementType`     | The type of the control that's been added and was received as the `[GeneXus type of control]` in the dataTransfer of the drop operation     |  Depending on where the control was dropped, additional information will be provided and different properties will be set. There are four possible cases:  1. Dropped on an empty container or in the last row of a container 2. Dropped on a new row of a non empty container 3. Dropped on an existing empty cell 4. Dropped on an existing row 5. Dropped on a non empty container control that doesn't handle cells nor rows  ###### 1. Dropped on an empty container or on a new row that will be the last row of a container  | Property          | Details                                                                                                                                     | | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | | `containerId`     | Identifier of the container where the control was dropped                                                                                   |  ###### 2. Dropped on a new row of a non empty container  | Property          | Details                                                                                                                                     | | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | | `beforeRowId`     | Identifier of the row next to the row where the control was dropped. An empty string if dropped in the last row or on an empty container.   |  ###### 3. Dropped on an existing empty cell  | Property      | Details                                                                                                          | | ------------- | ---------------------------------------------------------------------------------------------------------------- | | `targetCellId`| Identifier of the cell where the control was dropped |    ###### 4. Dropped on an existing row  | Property          | Details                                                                                                                                     | | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | | `beforeCelllId`   | Identifier of the cell that, after the drop operation, ends located after the dropped control. An empty string if dropped as the last cell. | | `targetRowId`     | Identifier of the row where the control was dropped                                                                                         |    ###### 5. Dropped on a non empty container control that doesn't handle cells nor rows  | Property          | Details                                                                                                                                           | | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | | `beforeControlId` | Identifier of the control that, after the drop operation, ends located after the dropped control. An empty string if dropped as the last control. | | `containerId`     | Identifier of the container where the control was dropped                                                                                         |
         */
        "onControlAdded"?: (event: CustomEvent<any>) => void;
        /**
          * Fired when a control has been removed from the layout  An object containing information of the add operation is sent in the `detail` property of the event object  | Property           | Details                                                     | | ------------------ | ----------------------------------------------------------- | | `controls`         | An array containing the identifiers of the removed controls |
         */
        "onControlRemoved"?: (event: CustomEvent<any>) => void;
        /**
          * Fired when the selection has been changed  An object containing information of the select operation is sent in the `detail` property of the event object  | Property       | Details                                                      | | -------------- | ------------------------------------------------------------ | | `controls`     | An array containing the identifiers of the selected controls |
         */
        "onControlSelected"?: (event: CustomEvent<any>) => void;
        /**
          * Fired when change drop target control during drag a control  | Property         | Details                                                                                                          | | ---------------- | ---------------------------------------------------------------------------------------------------------------- | | `targetControlId`| Identifier of the control where the control was hovered                                                          |
         */
        "onDropTargetChanged"?: (event: CustomEvent<any>) => void;
        /**
          * Fired when a control is moved inside the layout editor to a new location  An object containing information of the move operation is sent in the `detail` property of the event object  Regardless where the control was dropped, the detail object will contain information about the source row, the source cell (if available), and the id of the dropped control:  | Property         | Details                                                                                                          | | ---------------- | ---------------------------------------------------------------------------------------------------------------- | | `sourceCellId`   | Identifier of the source cell, if available                                                                      | | `sourceRowId`    | Identifier of the source row, if available                                                                       | | `controlId`      | Identifier of the control                                                                                        |  Depending on where the control was dropped, additional information will be provided and different properties will be set. There are five possible cases:  1. Dropped on an empty container or on a new row that will be the last row of a container 2. Dropped on a new row of a non empty container 3. Dropped on an existing empty cell 4. Dropped on an existing row 5. Dropped on a non empty container control that doesn't handle cells nor rows  ###### 1. Dropped on an empty container or on a new row that will be the last row of a container  | Property          | Details                                                                                                                                     | | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | | `containerId`     | Identifier of the container where the control was dropped                                                                                   |  ###### 2. Dropped on a new row of a non empty container  | Property          | Details                                                                                                                                     | | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | | `beforeRowId`     | Identifier of the row next to the row where the control was dropped. An empty string if dropped in the last row or on an empty container.   |  ###### 3. Dropped on an existing empty cell  | Property      | Details                                                                                                          | | ------------- | ---------------------------------------------------------------------------------------------------------------- | | `targetCellId`| Identifier of the cell where the control was dropped |    ###### 4. Dropped on an existing row  | Property          | Details                                                                                                                                     | | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | | `beforeCellId`    | Identifier of the cell that, after the drop operation, ends located after the dropped control. An empty string if dropped as the last cell. | | `targetRowId`     | Identifier of the row where the control was dropped                                                                                         |    ###### 5. Dropped on a non empty container control that doesn't handle cells nor rows  | Property          | Details                                                                                                                                           | | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | | `beforeControlId` | Identifier of the control that, after the drop operation, ends located after the dropped control. An empty string if dropped as the last control. | | `containerId`     | Identifier of the container where the control was dropped                                                                                         |
         */
        "onMoveCompleted"?: (event: CustomEvent<any>) => void;
        /**
          * Array with the identifiers of the selected controls. If empty the whole layout-editor is marked as selected.
         */
        "selectedControls"?: string[];
    }
    interface GxLayoutEditorPlaceholder {
    }
    interface GxLayoutEditorSample {
    }
    interface GxLeAction {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
    }
    interface GxLeCanvasTable {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
    }
    interface GxLeComponent {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
    }
    interface GxLeData {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
    }
    interface GxLeDefault {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
    }
    interface GxLeErrorviewer {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
    }
    interface GxLeFlexTable {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
    }
    interface GxLeFreestyleGrid {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
    }
    interface GxLeGroup {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
    }
    interface GxLeHorizontalRule {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
    }
    interface GxLeHyperlink {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
    }
    interface GxLeImage {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
    }
    interface GxLeResponsiveTable {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
    }
    interface GxLeSection {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
    }
    interface GxLeSimpleGrid {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
    }
    interface GxLeTab {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
        "tabItemSelectedId"?: string;
    }
    interface GxLeTabularTable {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
    }
    interface GxLeTextblock {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
    }
    interface GxLeToolBar {
        "control"?: HTMLElement;
        "onSelect"?: (event: CustomEvent<LayoutEditorToolSelectEvent>) => void;
    }
    interface GxLeToolBox {
        "control"?: HTMLElement;
    }
    interface GxLeToolBreadcrumb {
        "control"?: HTMLElement;
        "onSelect"?: (event: CustomEvent<LayoutEditorToolSelectEvent>) => void;
    }
    interface GxLeToolDimension {
        "control"?: HTMLElement;
        "type"?: LayoutEditorToolDimensionType;
    }
    interface GxLeToolDrag {
        "control"?: HTMLElement;
    }
    interface GxLeToolHighlightController {
        "dragTarget"?: string;
        "editor"?: LayoutEditor;
        "selection"?: string[];
    }
    interface GxLeToolIdentity {
        "control"?: HTMLElement;
    }
    interface GxLeToolSelection {
        "changeHighlight"?: boolean;
        "changeSmooth"?: boolean;
        "control"?: HTMLElement;
        "loadBar"?: boolean;
        "loadBox"?: boolean;
        "loadDimension"?: boolean;
        "preview"?: boolean;
    }
    interface GxLeUserControl {
        "context"?: ResolverContext;
        "model"?: GeneXusAbstractLayout.Cell;
    }
    interface IntrinsicElements {
        "gx-layout-editor": GxLayoutEditor;
        "gx-layout-editor-placeholder": GxLayoutEditorPlaceholder;
        "gx-layout-editor-sample": GxLayoutEditorSample;
        "gx-le-action": GxLeAction;
        "gx-le-canvas-table": GxLeCanvasTable;
        "gx-le-component": GxLeComponent;
        "gx-le-data": GxLeData;
        "gx-le-default": GxLeDefault;
        "gx-le-errorviewer": GxLeErrorviewer;
        "gx-le-flex-table": GxLeFlexTable;
        "gx-le-freestyle-grid": GxLeFreestyleGrid;
        "gx-le-group": GxLeGroup;
        "gx-le-horizontal-rule": GxLeHorizontalRule;
        "gx-le-hyperlink": GxLeHyperlink;
        "gx-le-image": GxLeImage;
        "gx-le-responsive-table": GxLeResponsiveTable;
        "gx-le-section": GxLeSection;
        "gx-le-simple-grid": GxLeSimpleGrid;
        "gx-le-tab": GxLeTab;
        "gx-le-tabular-table": GxLeTabularTable;
        "gx-le-textblock": GxLeTextblock;
        "gx-le-tool-bar": GxLeToolBar;
        "gx-le-tool-box": GxLeToolBox;
        "gx-le-tool-breadcrumb": GxLeToolBreadcrumb;
        "gx-le-tool-dimension": GxLeToolDimension;
        "gx-le-tool-drag": GxLeToolDrag;
        "gx-le-tool-highlight-controller": GxLeToolHighlightController;
        "gx-le-tool-identity": GxLeToolIdentity;
        "gx-le-tool-selection": GxLeToolSelection;
        "gx-le-user-control": GxLeUserControl;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "gx-layout-editor": LocalJSX.GxLayoutEditor & JSXBase.HTMLAttributes<HTMLGxLayoutEditorElement>;
            "gx-layout-editor-placeholder": LocalJSX.GxLayoutEditorPlaceholder & JSXBase.HTMLAttributes<HTMLGxLayoutEditorPlaceholderElement>;
            "gx-layout-editor-sample": LocalJSX.GxLayoutEditorSample & JSXBase.HTMLAttributes<HTMLGxLayoutEditorSampleElement>;
            "gx-le-action": LocalJSX.GxLeAction & JSXBase.HTMLAttributes<HTMLGxLeActionElement>;
            "gx-le-canvas-table": LocalJSX.GxLeCanvasTable & JSXBase.HTMLAttributes<HTMLGxLeCanvasTableElement>;
            "gx-le-component": LocalJSX.GxLeComponent & JSXBase.HTMLAttributes<HTMLGxLeComponentElement>;
            "gx-le-data": LocalJSX.GxLeData & JSXBase.HTMLAttributes<HTMLGxLeDataElement>;
            "gx-le-default": LocalJSX.GxLeDefault & JSXBase.HTMLAttributes<HTMLGxLeDefaultElement>;
            "gx-le-errorviewer": LocalJSX.GxLeErrorviewer & JSXBase.HTMLAttributes<HTMLGxLeErrorviewerElement>;
            "gx-le-flex-table": LocalJSX.GxLeFlexTable & JSXBase.HTMLAttributes<HTMLGxLeFlexTableElement>;
            "gx-le-freestyle-grid": LocalJSX.GxLeFreestyleGrid & JSXBase.HTMLAttributes<HTMLGxLeFreestyleGridElement>;
            "gx-le-group": LocalJSX.GxLeGroup & JSXBase.HTMLAttributes<HTMLGxLeGroupElement>;
            "gx-le-horizontal-rule": LocalJSX.GxLeHorizontalRule & JSXBase.HTMLAttributes<HTMLGxLeHorizontalRuleElement>;
            "gx-le-hyperlink": LocalJSX.GxLeHyperlink & JSXBase.HTMLAttributes<HTMLGxLeHyperlinkElement>;
            "gx-le-image": LocalJSX.GxLeImage & JSXBase.HTMLAttributes<HTMLGxLeImageElement>;
            "gx-le-responsive-table": LocalJSX.GxLeResponsiveTable & JSXBase.HTMLAttributes<HTMLGxLeResponsiveTableElement>;
            "gx-le-section": LocalJSX.GxLeSection & JSXBase.HTMLAttributes<HTMLGxLeSectionElement>;
            "gx-le-simple-grid": LocalJSX.GxLeSimpleGrid & JSXBase.HTMLAttributes<HTMLGxLeSimpleGridElement>;
            "gx-le-tab": LocalJSX.GxLeTab & JSXBase.HTMLAttributes<HTMLGxLeTabElement>;
            "gx-le-tabular-table": LocalJSX.GxLeTabularTable & JSXBase.HTMLAttributes<HTMLGxLeTabularTableElement>;
            "gx-le-textblock": LocalJSX.GxLeTextblock & JSXBase.HTMLAttributes<HTMLGxLeTextblockElement>;
            "gx-le-tool-bar": LocalJSX.GxLeToolBar & JSXBase.HTMLAttributes<HTMLGxLeToolBarElement>;
            "gx-le-tool-box": LocalJSX.GxLeToolBox & JSXBase.HTMLAttributes<HTMLGxLeToolBoxElement>;
            "gx-le-tool-breadcrumb": LocalJSX.GxLeToolBreadcrumb & JSXBase.HTMLAttributes<HTMLGxLeToolBreadcrumbElement>;
            "gx-le-tool-dimension": LocalJSX.GxLeToolDimension & JSXBase.HTMLAttributes<HTMLGxLeToolDimensionElement>;
            "gx-le-tool-drag": LocalJSX.GxLeToolDrag & JSXBase.HTMLAttributes<HTMLGxLeToolDragElement>;
            "gx-le-tool-highlight-controller": LocalJSX.GxLeToolHighlightController & JSXBase.HTMLAttributes<HTMLGxLeToolHighlightControllerElement>;
            "gx-le-tool-identity": LocalJSX.GxLeToolIdentity & JSXBase.HTMLAttributes<HTMLGxLeToolIdentityElement>;
            "gx-le-tool-selection": LocalJSX.GxLeToolSelection & JSXBase.HTMLAttributes<HTMLGxLeToolSelectionElement>;
            "gx-le-user-control": LocalJSX.GxLeUserControl & JSXBase.HTMLAttributes<HTMLGxLeUserControlElement>;
        }
    }
}

import { Component, Listen, Prop, State, Watch, h } from "@stencil/core";
import {
  findControlWrapper,
  getControlWrapper
} from "../../layout-editor/layout-editor-helpers";

import { ILayoutEditorToolSelectEvent } from "../layout-editor-tool-commons";
import { LayoutEditor } from "../../layout-editor/layout-editor";

@Component({
  tag: "gx-le-tool-highlight-controller"
})
export class LayoutEditorToolHighlightController {
  @Prop() editor: LayoutEditor;
  @Prop() selection: string[] = [];
  @State() hoveredControl: HTMLElement;
  @State() selectedControls: HTMLElement[] = [];

  @Watch("selection")
  watchSelection() {
    this.selectedControls = [];

    this.selection.map(id => {
      const control = getControlWrapper(id, this.editor.element);

      if (control) {
        this.selectedControls.push(control);
      }
    });
  }

  componentDidLoad() {
    this.editor.element.addEventListener(
      "mouseover",
      event => {
        this.handleMouseOver(event);
      },
      { passive: true }
    );
  }

  handleMouseOver(event: MouseEvent) {
    this.hoveredControl = findControlWrapper(event.target as HTMLElement);
  }

  @Listen("select")
  layoutEditorToolBarSelectHandler(event: CustomEvent) {
    const detail: ILayoutEditorToolSelectEvent = event.detail;

    this.updateSelection(detail.controlId, detail.add);
    event.stopPropagation();
  }

  @Listen("select")
  layoutEditorToolBreadcrumbSelectHandler(event: CustomEvent) {
    const detail: ILayoutEditorToolSelectEvent = event.detail;

    this.updateSelection(detail.controlId, detail.add);
    event.stopPropagation();
  }

  private updateSelection(selectedControlId: string, add: boolean) {
    this.editor.selectedControls = add
      ? [...this.editor.selectedControls, selectedControlId]
      : [selectedControlId];
  }

  render() {
    return (
      <div>
        <gx-le-tool-selection control={this.hoveredControl} changeSmooth />
        {this.selectedControls.map(control => (
          <gx-le-tool-selection
            control={control}
            changeHighlight
            loadBar
            loadBox
          />
        ))}
      </div>
    );
  }
}

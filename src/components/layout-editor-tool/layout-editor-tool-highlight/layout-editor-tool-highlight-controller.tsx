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
  @State() preview = false;

  mutation = new MutationObserver(this.handleMutationObserver.bind(this));

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

    this.mutation.observe(this.editor.element, {
      attributeFilter: ["class"],
      attributes: true
    });
  }

  handleMouseOver(event: MouseEvent) {
    this.hoveredControl = findControlWrapper(event.target as HTMLElement);
  }

  handleMutationObserver() {
    this.preview = this.editor.element.classList.contains("preview");
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
        <gx-le-tool-selection
          control={this.hoveredControl}
          changeSmooth
          preview={this.preview}
        />
        {this.selectedControls.map(control => (
          <gx-le-tool-selection
            control={control}
            changeHighlight
            loadBar
            loadBox
            preview={this.preview}
          />
        ))}
      </div>
    );
  }
}

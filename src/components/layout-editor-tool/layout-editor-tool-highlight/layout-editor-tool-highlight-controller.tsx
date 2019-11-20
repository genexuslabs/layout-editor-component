import { Component, Listen, Prop, State, Watch, h } from "@stencil/core";
import {
  findControlWrapper,
  getControlWrapper
} from "../../layout-editor/layout-editor-helpers";

import { LayoutEditor } from "../../layout-editor/layout-editor";
import { LayoutEditorToolSelectEvent } from "../layout-editor-tool-commons";

@Component({
  tag: "gx-le-tool-highlight-controller"
})
export class LayoutEditorToolHighlightController {
  @Prop() editor: LayoutEditor;
  @Prop() selection: string[] = [];
  @Prop() dragTarget: string;
  @State() dragging = false;
  @State() hoveredControl: HTMLElement;
  @State() selectedControls: HTMLElement[] = [];
  @State() dragTargetControl: HTMLElement;
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

  @Watch("dragTarget")
  watchDragTarget() {
    this.dragTargetControl = getControlWrapper(this.dragTarget);
  }

  componentDidLoad() {
    this.editor.element.addEventListener(
      "mouseover",
      event => {
        this.handleMouseOver(event);
      },
      { passive: true }
    );
    this.editor.element.addEventListener(
      "mouseleave",
      () => (this.hoveredControl = null),
      { passive: true }
    );
    this.editor.element.addEventListener(
      "dragstart",
      () => (this.dragging = true),
      { passive: true }
    );
    this.editor.element.addEventListener(
      "dragend",
      () => (this.dragging = false),
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
    const detail: LayoutEditorToolSelectEvent = event.detail;

    this.updateSelection(detail.controlId, detail.add);
    event.stopPropagation();
  }

  @Listen("select")
  layoutEditorToolBreadcrumbSelectHandler(event: CustomEvent) {
    const detail: LayoutEditorToolSelectEvent = event.detail;

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
          key="highlight-hovered"
          control={this.hoveredControl}
          changeSmooth
          preview={this.preview}
          hidden={!this.hoveredControl || this.dragging}
        />
        {this.selectedControls.map(control => (
          <gx-le-tool-selection
            key={`highlight-selected-${control.id}`}
            control={control}
            changeHighlight
            loadBar
            loadBox
            preview={this.preview}
            hidden={this.dragging}
          />
        ))}
        {this.dragTargetControl && (
          <gx-le-tool-selection
            key="highlight-drop-target"
            control={this.dragTargetControl}
            loadBar
            preview={this.preview}
          />
        )}
      </div>
    );
  }
}

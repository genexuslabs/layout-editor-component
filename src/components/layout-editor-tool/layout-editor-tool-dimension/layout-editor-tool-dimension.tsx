import { Component, Element, Prop, h } from "@stencil/core";

import { LayoutEditorToolDimensionType } from "../layout-editor-tool-commons";

@Component({
  styleUrl: "layout-editor-tool-dimension.scss",
  tag: "gx-le-tool-dimension"
})
export class LayoutEditorToolDimension {
  @Element() el: HTMLElement;
  @Prop() control: HTMLElement;
  @Prop() type: LayoutEditorToolDimensionType;

  componentDidLoad() {
    this.el.classList.add(this.type);
  }

  render() {
    return [
      <div class="guides">
        <div class="start-line" />
        <div class="start-circle" />
        <div class="size" />
        <div class="end-line" />
        <div class="end-circle" />
      </div>,
      <div class="length">280dip</div>
    ];
  }
}

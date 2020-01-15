import { Component, Element, Host, Prop, h } from "@stencil/core";

@Component({
  styleUrl: "layout-editor-tool-drag.scss",
  tag: "gx-le-tool-drag"
})
export class LayoutEditorToolDrag {
  @Element() el: HTMLElement;
  @Prop() control: HTMLElement;

  render() {
    return (
      <Host draggable="true">
        <gxg-icon type="drag" color="negative"></gxg-icon>
      </Host>
    );
  }
}

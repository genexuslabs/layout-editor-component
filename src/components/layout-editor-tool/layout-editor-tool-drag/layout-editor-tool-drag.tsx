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
        <gxg-button type="primary-icon-only">
          <gxg-icon slot="icon" type="drag"></gxg-icon>
        </gxg-button>
      </Host>
    );
  }
}

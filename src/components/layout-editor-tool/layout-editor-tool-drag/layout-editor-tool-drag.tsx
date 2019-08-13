import { Component, Element, Prop } from "@stencil/core";

@Component({
  styleUrl: "layout-editor-tool-drag.scss",
  tag: "gx-le-tool-drag"
})
export class LayoutEditorToolDrag {
  @Element() el: HTMLElement;
  @Prop() control: HTMLElement;

  componentWillLoad() {
    this.el.setAttribute("draggable", "true");
  }
}

import { Component, Prop, h } from "@stencil/core";

import { getControlData } from "../../layout-editor/layout-editor-helpers";

@Component({
  styleUrl: "layout-editor-tool-identity.scss",
  tag: "gx-le-tool-identity"
})
export class LayoutEditorToolSelection {
  @Prop() control: HTMLElement;

  render() {
    const data = getControlData(this.control);

    return (
      <div class="identity">
        <span class="typeName">{data.typeName}</span>
        <span class="name">{data.name}</span>
      </div>
    );
  }
}

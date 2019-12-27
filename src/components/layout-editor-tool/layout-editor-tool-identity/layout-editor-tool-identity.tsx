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
        <span class="type-name gxg-title-01 gxg-title-01--negative">
          {data.typeName}
        </span>
        <span class="name gxg-text gxg-text--negative">{data.name}</span>
      </div>
    );
  }
}

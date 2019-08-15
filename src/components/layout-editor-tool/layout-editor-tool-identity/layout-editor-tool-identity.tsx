import { Component, Prop, h } from "@stencil/core";

@Component({
  styleUrl: "layout-editor-tool-identity.scss",
  tag: "gx-le-tool-identity"
})
export class LayoutEditorToolSelection {
  @Prop() control: HTMLElement;

  render() {
    const identityTypeName =
      this.control &&
      this.control.dataset &&
      this.control.dataset.gxLeControlTypeName;
    const identityName =
      this.control &&
      this.control.dataset &&
      this.control.dataset.gxLeControlName;

    return (
      <div class="identity">
        <span class="typeName">{identityTypeName}</span>
        <span class="name">{identityName}</span>
      </div>
    );
  }
}

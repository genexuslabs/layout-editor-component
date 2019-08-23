import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  getControlCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-hyperlink.scss",
  tag: "gx-le-hyperlink"
})
export class LayoutEditorHyperlink {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { hyperlink } = this.model;

    return (
      <Host {...getControlCommonAttrs(this.model)}>
        <a href="#" class={hyperlink["@class"]}>
          {hyperlink["@text"]}
        </a>
      </Host>
    );
  }
}

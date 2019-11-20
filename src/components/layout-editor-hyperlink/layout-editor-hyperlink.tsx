import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  ResolverContext,
  getControlCommonAttrs,
  getControlWrapperCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-hyperlink.scss",
  tag: "gx-le-hyperlink"
})
export class LayoutEditorHyperlink {
  @Element() element: HTMLElement;

  @Prop() context: ResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { hyperlink } = this.model;

    return (
      <Host {...getControlWrapperCommonAttrs(this.model)}>
        <a
          {...getControlCommonAttrs(hyperlink)}
          href="#"
          class={hyperlink["@class"]}
        >
          {hyperlink["@text"]}
        </a>
      </Host>
    );
  }
}

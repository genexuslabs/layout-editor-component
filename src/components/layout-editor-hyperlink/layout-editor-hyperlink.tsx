import { Component, Element, Prop, h } from "@stencil/core";

import { IResolverContext } from "../layout-editor/layout-editor-control-resolver";

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

    this.element.setAttribute("data-gx-le-control-id", hyperlink["@id"]);

    return (
      <a
        data-gx-le-control-id={hyperlink["@id"]}
        href="#"
        class={hyperlink["@class"]}
      >
        {hyperlink["@text"]}
      </a>
    );
  }
}

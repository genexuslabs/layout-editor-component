import { Component, Element, Prop, h } from "@stencil/core";

import { IResolverContext } from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-image.scss",
  tag: "gx-le-image"
})
export class LayoutEditorImage {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { image } = this.model;

    this.element.setAttribute("data-gx-le-control-id", image["@id"]);

    return (
      <gx-image
        alt={image["@controlName"]}
        data-gx-le-control-id={image["@id"]}
        src={image.imgSrc}
        css-class={image["@class"]}
      />
    );
  }
}

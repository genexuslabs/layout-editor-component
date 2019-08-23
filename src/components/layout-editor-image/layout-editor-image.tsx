import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  getControlCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

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

    return (
      <Host {...getControlCommonAttrs(this.model)}>
        <gx-image
          alt={image["@controlName"]}
          src={image.imgSrc}
          css-class={image["@class"]}
        />
      </Host>
    );
  }
}

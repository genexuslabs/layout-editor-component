import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  ResolverContext,
  getControlCommonAttrs,
  getControlWrapperCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-image.scss",
  tag: "gx-le-image"
})
export class LayoutEditorImage {
  @Element() element: HTMLElement;

  @Prop() context: ResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { image } = this.model;

    return (
      <Host {...getControlWrapperCommonAttrs(this.model)}>
        <gx-image
          {...getControlCommonAttrs(image)}
          alt={image["@controlName"]}
          src={image.imgSrc}
          css-class={image["@class"]}
        />
      </Host>
    );
  }
}

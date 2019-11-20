import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  ResolverContext,
  getControlCommonAttrs,
  getControlWrapperCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-textblock.scss",
  tag: "gx-le-textblock"
})
export class LayoutEditorTextblock {
  @Element() element: HTMLElement;

  @Prop() context: ResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { textblock } = this.model;

    return (
      <Host {...getControlWrapperCommonAttrs(this.model)}>
        <gx-textblock {...getControlCommonAttrs(textblock)}>
          {textblock["@caption"]}
        </gx-textblock>
      </Host>
    );
  }
}

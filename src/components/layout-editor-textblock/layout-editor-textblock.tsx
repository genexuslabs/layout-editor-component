import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  getControlCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-textblock.scss",
  tag: "gx-le-textblock"
})
export class LayoutEditorTextblock {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { textblock } = this.model;

    return (
      <Host {...getControlCommonAttrs(this.model)}>
        <gx-textblock>{textblock["@caption"]}</gx-textblock>
      </Host>
    );
  }
}

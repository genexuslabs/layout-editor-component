import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  getControlCommonAttrs,
  getControlWrapperCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-horizontal-rule.scss",
  tag: "gx-le-horizontal-rule"
})
export class LayoutEditorHorizontalRule {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { horizontalrule } = this.model;

    return (
      <Host {...getControlWrapperCommonAttrs(this.model)}>
        <hr {...getControlCommonAttrs()} class={horizontalrule["@class"]}>
          {" "}
        </hr>
      </Host>
    );
  }
}

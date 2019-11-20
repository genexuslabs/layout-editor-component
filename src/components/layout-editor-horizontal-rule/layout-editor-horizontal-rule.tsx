import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  ResolverContext,
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

  @Prop() context: ResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { horizontalrule } = this.model;

    return (
      <Host {...getControlWrapperCommonAttrs(this.model)}>
        <hr
          {...getControlCommonAttrs(horizontalrule)}
          class={horizontalrule["@class"]}
        >
          {" "}
        </hr>
      </Host>
    );
  }
}

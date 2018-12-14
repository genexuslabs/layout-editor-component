import { Component, Element, Prop } from "@stencil/core";
import { IResolverContext } from "../layout-editor/layout-editor-control-resolver";

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

    this.element.setAttribute(
      "data-gx-le-control-id",
      horizontalrule["@id"] || ""
    );

    return <hr class={horizontalrule["@class"]}> </hr>;
  }
}

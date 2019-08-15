import { Component, Element, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  controlResolver
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-group.scss",
  tag: "gx-le-group"
})
export class LayoutEditorGroup {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { group } = this.model;
    this.element.setAttribute("data-gx-le-control-id", group["@id"]);

    return (
      <gx-group
        caption={group["@caption"]}
        class={group["@class"]}
        data-gx-le-container
      >
        {controlResolver(group, this.context)}
      </gx-group>
    );
  }
}

import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  controlResolver,
  getControlCommonAttrs,
  getControlWrapperCommonAttrs
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

    return (
      <Host {...getControlWrapperCommonAttrs(this.model)}>
        <gx-group
          {...getControlCommonAttrs(group)}
          caption={group["@caption"]}
          class={group["@class"]}
          data-gx-le-container
        >
          {controlResolver(group, this.context)}
        </gx-group>
      </Host>
    );
  }
}

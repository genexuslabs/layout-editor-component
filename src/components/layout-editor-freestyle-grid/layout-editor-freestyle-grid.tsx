import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  ResolverContext,
  controlResolver,
  getControlCommonAttrs,
  getControlTypeName,
  getControlWrapperCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-freestyle-grid.scss",
  tag: "gx-le-freestyle-grid"
})
export class LayoutEditorFreestyleGrid {
  @Element() element: HTMLElement;

  @Prop() context: ResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { grid } = this.model;
    const headerBarText = getControlTypeName(this.model);

    return (
      <Host {...getControlWrapperCommonAttrs(this.model)}>
        <div
          {...getControlCommonAttrs(grid)}
          class={grid["@class"]}
          data-gx-le-control-header-bar
          style={{
            "--gx-le-control-header-bar-text": `'${headerBarText}'`
          }}
        >
          {controlResolver(grid, this.context)}
        </div>
      </Host>
    );
  }
}

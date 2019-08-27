import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  controlResolver,
  getControlCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-freestyle-grid.scss",
  tag: "gx-le-freestyle-grid"
})
export class LayoutEditorFreestyleGrid {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { grid } = this.model;

    return (
      <Host {...getControlCommonAttrs(this.model)}>
        <div
          class={grid["@class"]}
          data-gx-le-control-header-bar
          style={{
            "--gx-le-control-header-bar-text": `'${this.model.controlType}'`
          }}
        >
          {controlResolver(grid, this.context)}
        </div>
      </Host>
    );
  }
}

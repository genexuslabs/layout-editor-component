import { Component, Element, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  controlResolver,
  isCellSelected
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

    this.element.setAttribute("data-gx-le-control-id", grid["@id"]);

    return (
      <div
        class={grid["@class"]}
        data-gx-le-control-id={grid["@id"]}
        data-gx-le-control-header-bar
        data-gx-le-selected={isCellSelected(grid, this.context).toString()}
        style={{
          "--gx-le-control-header-bar-text": `'${this.model.controlType}'`
        }}
      >
        {controlResolver(grid, this.context)}
      </div>
    );
  }
}

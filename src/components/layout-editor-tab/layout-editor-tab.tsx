import { Component, Element, Prop } from "@stencil/core";
import {
  IResolverContext,
  controlResolver
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-tab.scss",
  tag: "gx-le-tab"
})
export class LayoutEditorTab {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { tab } = this.model;

    this.element.setAttribute("data-gx-le-control-id", tab["@id"] || "");

    return renderTab(this.context, tab);
  }
}

function renderTab(context: IResolverContext, tab: GeneXusAbstractLayout.Tab) {
  return (
    <gx-tab data-gx-le-control-id={tab["@id"]}>
      {tab.item.map((tabItem, index) => {
        return renderTabItem(context, tabItem, index === 0);
      })}
    </gx-tab>
  );
}

function renderTabItem(
  context: IResolverContext,
  tabItem: GeneXusAbstractLayout.TabItem,
  selected: boolean
) {
  return [
    <gx-tab-caption slot="caption" selected={selected}>
      {tabItem["@caption"]}
    </gx-tab-caption>,
    <gx-tab-page slot="page">{controlResolver(tabItem, context)}</gx-tab-page>
  ];
}

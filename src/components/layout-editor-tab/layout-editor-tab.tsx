import { Component, Element, Host, Listen, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  controlResolver,
  getControlCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

import { getControlId } from "../layout-editor/layout-editor-helpers";

@Component({
  shadow: false,
  styleUrl: "layout-editor-tab.scss",
  tag: "gx-le-tab"
})
export class LayoutEditorTab {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  tabItemSelectedId = "";

  @Listen("onTabChange")
  onTabChangeHandler(event: CustomEvent) {
    this.tabItemSelectedId = getControlId(event.detail.target);
  }

  render() {
    const { tab } = this.model;

    return (
      <Host {...getControlCommonAttrs(this.model)}>
        {this.renderTab(this.context, tab)}
      </Host>
    );
  }

  renderTab(context: IResolverContext, tab: GeneXusAbstractLayout.Tab) {
    const tabItemSelectedIndex = tab.item.findIndex(
      el => el["@id"] === this.tabItemSelectedId
    );

    return (
      <gx-tab>
        {tab.item.map((tabItem, index) => {
          return this.renderTabItem(
            context,
            tabItem,
            tabItemSelectedIndex === -1
              ? index === 0
              : index === tabItemSelectedIndex
          );
        })}
      </gx-tab>
    );
  }

  renderTabItem(
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
}

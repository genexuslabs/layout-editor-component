import { Component, Element, Host, Listen, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  controlResolver,
  getControlCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";
import {
  getControlItemId,
  setControlItemSelectedId
} from "../layout-editor/layout-editor-helpers";

@Component({
  shadow: false,
  styleUrl: "layout-editor-tab.scss",
  tag: "gx-le-tab"
})
export class LayoutEditorTab {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;
  @Prop({
    attribute: "data-gx-le-control-item-selected-id",
    mutable: true,
    reflect: true
  })
  tabItemSelectedId = "";

  componentWillLoad() {
    const tabItem = this.model.tab.item[0];

    if (tabItem && !this.tabItemSelectedId) {
      this.tabItemSelectedId = tabItem["@id"];
    }
  }

  @Listen("onTabChange")
  onTabChangeHandler(event: CustomEvent) {
    this.tabItemSelectedId = getControlItemId(event.detail.target);

    /**
     * Workaround to set attribute when event is fired.
     * Reflect property is fired during render but value is needed
     * during click event of selection manager.
     */
    setControlItemSelectedId(this.element, this.tabItemSelectedId);
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
      <gx-tab-caption
        slot="caption"
        selected={selected}
        data-gx-le-control-item-id={tabItem["@id"]}
      >
        {tabItem["@caption"]}
      </gx-tab-caption>,
      <gx-tab-page slot="page" data-gx-le-control-item-id={tabItem["@id"]}>
        {controlResolver(tabItem, context)}
      </gx-tab-page>
    ];
  }
}

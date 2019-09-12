import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  controlResolver,
  getControlCommonAttrs,
  getControlWrapperCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-section.scss",
  tag: "gx-le-section"
})
export class LayoutEditorSection {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { section } = this.model;

    const items = section.item;
    const isEmptySection = items.length === 0;

    return (
      <Host {...getControlWrapperCommonAttrs(this.model)}>
        <div
          {...getControlCommonAttrs()}
          data-gx-le-container
          data-gx-le-container-empty={isEmptySection.toString()}
        >
          {items.length ? (
            items.map(item => (
              <div
                tabindex="0"
                key={item["@id"]}
                data-gx-le-drop-area="vertical"
              >
                {controlResolver(item, this.context)}
              </div>
            ))
          ) : (
            <gx-layout-editor-placeholder data-gx-le-placeholder="row" />
          )}
        </div>
      </Host>
    );
  }
}

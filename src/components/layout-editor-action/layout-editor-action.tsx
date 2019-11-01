import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  getControlCommonAttrs,
  getControlWrapperCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-action.scss",
  tag: "gx-le-action"
})
export class LayoutEditorAction {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { action } = this.model;

    return (
      <Host {...getControlWrapperCommonAttrs(this.model)}>
        <gx-button
          {...getControlCommonAttrs(action)}
          css-class={action["@class"]}
          disabled={action["@enabled"] === "False"}
          image-position={imagePositionMap[action["@imagePosition"]]}
        >
          {action["@image"] && <img slot="main-image" src={action["@image"]} />}
          {action["@disabledImage"] && (
            <img slot="disabled-image" src={action["@disabledImage"]} />
          )}
          {action["@caption"]}
        </gx-button>
      </Host>
    );
  }
}

const imagePositionMap = {
  "Above Text": "above",
  "After Text": "after",
  "Before Text": "before",
  "Behind Text": "behind",
  "Below Text": "below"
};

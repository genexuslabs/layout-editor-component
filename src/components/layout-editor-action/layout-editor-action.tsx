import { Component, Element, Prop } from "@stencil/core";
import { IResolverContext } from "../layout-editor/layout-editor-control-resolver";

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

    this.element.setAttribute("data-gx-le-control-id", action["@id"] || "");

    return (
      <gx-button
        css-class={action["@class"]}
        data-gx-le-control-id={action["@id"]}
        disabled={action["@enabled"] === "False"}
        image-position={imagePositionMap[action["@imagePosition"]]}
      >
        {action["@image"] && <img slot="main-image" src={action["@image"]} />}
        {action["@disabledImage"] && (
          <img slot="disabled-image" src={action["@disabledImage"]} />
        )}
        {action["@caption"]}
      </gx-button>
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

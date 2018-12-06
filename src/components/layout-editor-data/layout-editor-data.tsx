import { Component, Element, Prop } from "@stencil/core";
import { IResolverContext } from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-data.scss",
  tag: "gx-le-data"
})
export class LayoutEditorData {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { data } = this.model;

    this.element.setAttribute("data-gx-le-control-id", data["@id"]);

    return (
      <gx-form-field
        label-caption={data["@labelCaption"]}
        label-position={labelPositionMap[data["@labelPosition"]]}
      >
        <gx-edit
          area="field"
          disabled={data["@enabled"] === "False"}
          readonly
          value={data["@controlName"]}
          class={data["@class"]}
        />
      </gx-form-field>
    );
  }
}

const labelPositionMap = {
  Left: "left",
  "Platform Default": "left",
  Top: "top"
};

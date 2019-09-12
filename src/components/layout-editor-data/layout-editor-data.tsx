import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  getControlCommonAttrs,
  getControlWrapperCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

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

    return (
      <Host {...getControlWrapperCommonAttrs(this.model)}>
        <gx-form-field
          {...getControlCommonAttrs()}
          label-caption={data["@labelCaption"]}
          label-position={labelPositionMap[data["@labelPosition"]]}
        >
          <gx-edit
            area="field"
            disabled
            value={data["@controlName"]}
            class={data["@class"]}
          />
        </gx-form-field>
      </Host>
    );
  }
}

const labelPositionMap = {
  Left: "left",
  "Platform Default": "left",
  Top: "top"
};

import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  ResolverContext,
  getControlCommonAttrs,
  getControlWrapperCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

const labelPositionMap = {
  Left: "left",
  "Platform Default": "left",
  Top: "top"
};

@Component({
  shadow: false,
  styleUrl: "layout-editor-data.scss",
  tag: "gx-le-data"
})
export class LayoutEditorData {
  @Element() element: HTMLElement;

  @Prop() context: ResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { data } = this.model;
    const renderControlTypeFn = this.getRenderControlTypeFn(
      data.CustomProperties.ControlType
    );

    return (
      <Host {...getControlWrapperCommonAttrs(this.model)}>
        <gx-form-field
          {...getControlCommonAttrs(data)}
          label-caption={data["@labelCaption"]}
          label-position={labelPositionMap[data["@labelPosition"]]}
        >
          {renderControlTypeFn(data)}
        </gx-form-field>
      </Host>
    );
  }

  renderEdit(data: GeneXusAbstractLayout.Data) {
    return (
      <gx-edit
        area="field"
        disabled
        value={data["@controlName"]}
        class={data["@class"]}
      />
    );
  }

  renderCheckBox(data: GeneXusAbstractLayout.Data) {
    return <gx-checkbox caption={data.CustomProperties.ControlTitle} />;
  }

  renderComboBox(data: GeneXusAbstractLayout.Data) {
    return (
      <gx-select>
        {data.CustomProperties.ControlValuesList.map(item => (
          <gx-select-option value={item.Value}>{item.Name}</gx-select-option>
        ))}
      </gx-select>
    );
  }

  renderRadioButton(data: GeneXusAbstractLayout.Data) {
    return (
      <gx-radio-group>
        {data.CustomProperties.ControlValuesList.map(item => (
          <gx-radio-option caption={item.Name} value={item.Value} />
        ))}
      </gx-radio-group>
    );
  }

  getRenderControlTypeFn(
    controlType: GeneXusAbstractLayout.DataCustomPropertiesControlType
  ) {
    switch (controlType) {
      case "Edit":
        return this.renderEdit;
      case "Check Box":
        return this.renderCheckBox;
      case "Combo Box":
        return this.renderComboBox;
      case "Radio Button":
        return this.renderRadioButton;
      default:
        return this.renderEdit;
    }
  }
}

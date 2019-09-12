import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  getControlCommonAttrs,
  getControlWrapperCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-default.scss",
  tag: "gx-le-default"
})
export class LayoutEditorDefault {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const childControl = this.model[this.model.childControlType];

    return (
      <Host {...getControlWrapperCommonAttrs(this.model)}>
        <div
          {...getControlCommonAttrs()}
          data-gx-le-control-obj={JSON.stringify(this.model)}
          data-gx-le-default-render=""
        >
          {`<${this.model.controlType}`}: {`${childControl["@controlName"]}>`}
        </div>
      </Host>
    );
  }
}

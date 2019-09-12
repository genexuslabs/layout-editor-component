import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  getControlCommonAttrs,
  getControlWrapperCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-component.scss",
  tag: "gx-le-component"
})
export class LayoutEditorComponent {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { component } = this.model;

    return (
      <Host {...getControlWrapperCommonAttrs(this.model)}>
        <div {...getControlCommonAttrs()}>
          {component["@controlName"]}
          {component["@webObject"] ? ":" + component["@webObject"] : ""}
        </div>
      </Host>
    );
  }
}

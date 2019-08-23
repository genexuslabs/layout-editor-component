import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  getControlCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-errorviewer.scss",
  tag: "gx-le-errorviewer"
})
export class LayoutEditorErrorViewer {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { errorviewer } = this.model;

    return (
      <Host {...getControlCommonAttrs(this.model)}>
        <span class={errorviewer["@class"]}>{errorviewer["@controlName"]}</span>
      </Host>
    );
  }
}

import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  ResolverContext,
  getControlCommonAttrs,
  getControlWrapperCommonAttrs
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-errorviewer.scss",
  tag: "gx-le-errorviewer"
})
export class LayoutEditorErrorViewer {
  @Element() element: HTMLElement;

  @Prop() context: ResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { errorviewer } = this.model;

    return (
      <Host {...getControlWrapperCommonAttrs(this.model)}>
        <span
          {...getControlCommonAttrs(errorviewer)}
          class={errorviewer["@class"]}
        >
          {errorviewer["@controlName"]}
        </span>
      </Host>
    );
  }
}

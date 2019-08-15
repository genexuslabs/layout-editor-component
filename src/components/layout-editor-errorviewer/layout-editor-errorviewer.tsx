import { Component, Element, Prop, h } from "@stencil/core";

import { IResolverContext } from "../layout-editor/layout-editor-control-resolver";

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

    this.element.setAttribute("data-gx-le-control-id", errorviewer["@id"]);

    return (
      <span
        data-gx-le-control-id={errorviewer["@id"]}
        class={errorviewer["@class"]}
      >
        {errorviewer["@controlName"]}
      </span>
    );
  }
}

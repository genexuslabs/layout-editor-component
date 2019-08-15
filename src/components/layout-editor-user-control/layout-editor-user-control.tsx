import { Component, Element, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  controlResolver
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-user-control.scss",
  tag: "gx-le-user-control"
})
export class LayoutEditorUserControl {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { ucw } = this.model;

    this.element.setAttribute("data-gx-le-control-id", ucw["@id"]);

    if ((ucw as GeneXusAbstractLayout.UcwContainer).childControlType) {
      return controlResolver(ucw, this.context);
    } else {
      return (
        <div>
          {`<${ucw.CustomProperties.UserControlType}`}:{" "}
          {`${ucw.CustomProperties.ControlName}>`}
        </div>
      );
    }
  }
}

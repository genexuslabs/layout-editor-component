import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  controlResolver,
  getControlCommonAttrs
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

    return (
      <Host {...getControlCommonAttrs(this.model)}>
        {this.renderUCW(this.context, ucw)}
      </Host>
    );
  }

  renderUCW(context: IResolverContext, ucw: GeneXusAbstractLayout.Ucw) {
    if ((ucw as GeneXusAbstractLayout.UcwContainer).childControlType) {
      return controlResolver(ucw, context);
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

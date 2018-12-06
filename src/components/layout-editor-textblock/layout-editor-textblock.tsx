import { Component, Element, Prop } from "@stencil/core";
import { IResolverContext } from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-textblock.scss",
  tag: "gx-le-textblock"
})
export class LayoutEditorTextblock {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: any;

  render() {
    const { textblock } = this.model;

    this.element.setAttribute("data-gx-le-control-id", textblock["@id"]);

    return (
      <gx-textblock data-gx-le-control-id={textblock["@id"]}>
        {textblock["@caption"]}
      </gx-textblock>
    );
  }
}

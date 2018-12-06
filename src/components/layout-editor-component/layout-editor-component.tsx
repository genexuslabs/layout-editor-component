import { Component, Element, Prop } from "@stencil/core";
import { IResolverContext } from "../layout-editor/layout-editor-control-resolver";

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

    this.element.setAttribute("data-gx-le-control-id", component["@id"]);

    return (
      <div data-gx-le-control-id={component["@id"]}>
        {component["@controlName"]}
        {component["@webObject"] ? ":" + component["@webObject"] : ""}
      </div>
    );
  }
}

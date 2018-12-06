import { Component, Element, Prop } from "@stencil/core";
import {
  IResolverContext,
  isCellSelected
} from "../layout-editor/layout-editor-control-resolver";

@Component({
  shadow: false,
  styleUrl: "layout-editor-simple-grid.scss",
  tag: "gx-le-simple-grid"
})
export class LayoutEditorSimpelGrid {
  @Element() element: HTMLElement;

  @Prop() context: IResolverContext;
  @Prop() model: any;

  render() {
    const { simplegrid } = this.model;
    const headerBarText = simplegrid.controlType || "Grid";

    this.element.setAttribute("data-gx-le-control-id", simplegrid["@id"]);
    this.element.setAttribute("data-gx-le-control-header-bar", "");

    this.element.style.setProperty(
      "--gx-le-control-header-bar-text",
      `'${headerBarText}'`
    );

    return (
      <table
        data-gx-le-container
        class={simplegrid["@class"]}
        style={{
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr>
            {simplegrid.item.map(item => (
              <th
                key={item["@id"]}
                tabindex="0"
                class={item["@class"]}
                data-gx-le-control-id={item["@id"]}
                data-gx-le-selected={isCellSelected(
                  item,
                  this.context
                ).toString()}
              >
                {item["@titleExp"]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {simplegrid.item.map(item => (
              <td
                key={item["@id"]}
                data-gx-le-control-id={item["@id"]}
                data-gx-le-selected={isCellSelected(
                  item,
                  this.context
                ).toString()}
                data-gx-le-drop-area="horizontal"
              >
                <gx-le-data model={{ data: item }} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  }
}

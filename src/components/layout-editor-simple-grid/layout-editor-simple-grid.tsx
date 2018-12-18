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
  @Prop() model: GeneXusAbstractLayout.Cell;

  render() {
    const { simplegrid } = this.model;
    const headerBarText = this.model.controlType || "Grid";

    this.element.setAttribute("data-gx-le-control-id", simplegrid["@id"]);
    this.element.setAttribute("data-gx-le-control-header-bar", "");

    this.element.style.setProperty(
      "--gx-le-control-header-bar-text",
      `'${headerBarText}'`
    );

    const items: GeneXusAbstractLayout.SimpleGridItem[] = simplegrid.item
      ? Array.isArray(simplegrid.item)
        ? simplegrid.item
        : [simplegrid.item]
      : [];

    const acceptedElementTypes = simplegrid.acceptedElementTypes || [];
    const acceptedTypesAttrs = {
      "data-gx-le-accepted-element-types": acceptedElementTypes.join(","),
      "data-gx-le-accepted-tag-names": "gx-le-data"
    };

    return (
      <table
        data-gx-le-container
        class={simplegrid["@class"]}
        style={{
          borderCollapse: "collapse",
          width: "100%"
        }}
      >
        <thead>
          <tr>
            {items.map(item => (
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
            {items.length ? (
              items.map(item => (
                <td
                  key={item["@id"]}
                  data-gx-le-control-id={item["@id"]}
                  data-gx-le-selected={isCellSelected(
                    item,
                    this.context
                  ).toString()}
                  data-gx-le-drop-area="horizontal"
                  {...acceptedTypesAttrs}
                >
                  <gx-le-data
                    model={
                      ({ data: item } as any) as GeneXusAbstractLayout.Cell
                    }
                  />
                </td>
              ))
            ) : (
              <td data-gx-le-placeholder="row" {...acceptedTypesAttrs} />
            )}
          </tr>
        </tbody>
      </table>
    );
  }
}

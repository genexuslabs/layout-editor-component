import { Component, Element, Host, Prop, h } from "@stencil/core";
import {
  IResolverContext,
  getControlCommonAttrs
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

    const items: GeneXusAbstractLayout.SimpleGridItem[] = simplegrid.item
      ? Array.isArray(simplegrid.item)
        ? simplegrid.item
        : [simplegrid.item]
      : [];

    const acceptedElementTypes = simplegrid.acceptedElementTypes || [];
    const acceptedTypesAttrs = {
      "data-gx-le-accepted-element-types": acceptedElementTypes.join(","),
      "data-gx-le-accepted-selectors":
        "gx-le-simple-grid div.column, gx-le-data"
    };

    return (
      <Host
        {...getControlCommonAttrs(this.model)}
        style={{ "--gx-le-control-header-bar-text": `'${headerBarText}'` }}
      >
        <div data-gx-le-control-header-bar>
          <table
            data-gx-le-container
            data-gx-le-container-empty={(!items.length).toString()}
            class={simplegrid["@class"]}
            style={{
              borderCollapse: "collapse",
              width: "100%"
            }}
          >
            <tbody>
              <tr>
                {items.length ? (
                  items.map(item => (
                    <td
                      key={item["@id"]}
                      data-gx-le-drop-area="horizontal"
                      {...acceptedTypesAttrs}
                    >
                      <div class="column">
                        <div class="header">{item["@titleExp"]}</div>
                        <gx-le-data
                          model={
                            ({
                              childControlType: "data",
                              data: item
                            } as any) as GeneXusAbstractLayout.Cell
                          }
                        />
                      </div>
                    </td>
                  ))
                ) : (
                  <td data-gx-le-placeholder="row" {...acceptedTypesAttrs} />
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </Host>
    );
  }
}

import {
  IResolverContext,
  isCellSelected
} from "../layout-editor-control-resolver";
import dataResolver from "./data-resolver";

export default function simpleGridResolver(
  { simplegrid },
  context: IResolverContext
) {
  const headerBarText = simplegrid.controlType || "Grid";
  return (
    <div
      data-gx-le-control-header-bar
      style={{
        "--gx-le-control-header-bar-text": `'${headerBarText}'`,
        border: "1px solid var(--gx-le-control-header-bar-background-color)"
      }}
      data-gx-le-simple-grid
    >
      <table
        data-gx-le-container
        data-gx-le-control-id={simplegrid["@id"]}
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
                data-gx-le-selected={isCellSelected(item, context).toString()}
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
                data-gx-le-selected={isCellSelected(item, context).toString()}
                data-gx-le-drop-area="horizontal"
              >
                {dataResolver({
                  data: item
                })}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

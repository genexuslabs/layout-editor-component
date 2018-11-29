import {
  IResolverContext,
  isCellSelected
} from "../layout-editor-control-resolver";

export default function simpleGridResolver(
  { simplegrid },
  context: IResolverContext
) {
  const headerBarText = simplegrid.controlType || "Grid";
  return (
    <div
      data-gx-le-control-id={simplegrid["@id"]}
      data-gx-le-control-header-bar
      style={{
        "--gx-le-control-header-bar-text": `'${headerBarText}'`,
        border: "1px solid var(--gx-le-control-header-bar-background-color)"
      }}
    >
      <table
        class={simplegrid["@class"]}
        style={{
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr>
            {simplegrid.item.map(item => (
              <th
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
        <tbody>{getGridRows(simplegrid.item, context)}</tbody>
      </table>
    </div>
  );
}

const MAX_FAKE_ROWS = 5;
function getGridRows(gridColumns, context) {
  const rows = [];
  for (let i = 0; i < MAX_FAKE_ROWS; i++) {
    rows.push(
      <tr>
        {gridColumns.map(item => (
          <td
            class={item["@class"]}
            data-gx-le-control-id={item["@id"]}
            data-gx-le-selected={isCellSelected(item, context).toString()}
          >
            {item["@attribute"]}
          </td>
        ))}
      </tr>
    );
  }

  return rows;
}

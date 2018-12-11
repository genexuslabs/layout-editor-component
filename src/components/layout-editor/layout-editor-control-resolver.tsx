const resolversMap: IResolverMapEntry[] = [
  {
    tag: "gx-le-action",
    type: "action"
  },
  {
    tag: "gx-le-component",
    type: "component"
  },
  {
    tag: "gx-le-data",
    type: "data"
  },
  {
    tag: "gx-le-freestyle-grid",
    type: "grid"
  },
  {
    tag: "gx-le-image",
    type: "image"
  },
  {
    tag: "gx-le-textblock",
    type: "textblock"
  },
  {
    tag: "gx-le-section",
    type: "section"
  },
  {
    tag: "gx-le-simple-grid",
    type: "simplegrid"
  },
  {
    resolver: tableResolver,
    type: "table"
  }
];

export function controlResolver(control, context: IResolverContext) {
  if (control.childControlType) {
    const resolverObj = findResolverByType(control.childControlType);

    if (resolverObj) {
      if (resolverObj.resolver) {
        return resolverObj.resolver(control, context);
      } else {
        const TagType = resolverObj.tag;
        return <TagType model={control} context={context} />;
      }
    } else {
      return <gx-le-default model={control} context={context} />;
    }
  }
  return null;
}

function findResolverByType(type: string): IResolverMapEntry {
  return resolversMap.find(r => r.type === type);
}

export function isCellSelected(cell, context: IResolverContext): boolean {
  const controlToVerify = findChildControl(cell) || cell;
  for (const selControl of context.selectedControls) {
    if (selControl === controlToVerify["@id"]) {
      return true;
    }
  }

  return false;
}

function findChildControl(cell): any {
  return cell[cell.childControlType];
}

interface IResolverMapEntry {
  resolver?: (control: any, context?: IResolverContext) => void;
  tag?: string;
  type: string;
}

export interface IResolverContext {
  selectedControls: string[];
}

const tableComponentsMap = {
  Flex: "gx-le-flex-table",
  Responsive: "gx-le-responsive-table",
  Tabular: "gx-le-tabular-table"
};

function tableResolver(cell, context) {
  const TagType = tableComponentsMap[cell.table["@tableType"]];
  return <TagType model={cell} context={context} />;
}

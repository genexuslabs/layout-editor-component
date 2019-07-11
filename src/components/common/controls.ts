export const controlsDefinition: IControlDefinition[] = [
  {
    type: "Attribute",
    typeName: "Attribute"
  },
  {
    tag: "gx-le-action",
    type: "action",
    typeName: "Action"
  },
  {
    type: "actiongroup",
    typeName: "Action Group"
  },
  {
    tag: "gx-le-component",
    type: "component",
    typeName: "Component"
  },
  {
    tag: "gx-le-data",
    type: "data",
    typeName: "Data"
  },
  {
    tag: "gx-le-errorviewer",
    type: "errorviewer",
    typeName: "Error Viewer"
  },
  {
    type: "embeddedpage",
    typeName: "Embedded Page"
  },
  {
    tag: "gx-le-freestyle-grid",
    type: "grid",
    typeName: "Grid"
  },
  {
    tag: "gx-le-group",
    type: "group",
    typeName: "Group"
  },
  {
    tag: "gx-le-horizontal-rule",
    type: "horizontalrule",
    typeName: "Horizontal Rule"
  },
  {
    tag: "gx-le-hyperlink",
    type: "hyperlink",
    typeName: "Hyperlink"
  },
  {
    tag: "gx-le-image",
    type: "image",
    typeName: "Image"
  },
  {
    tag: "gx-le-textblock",
    type: "textblock",
    typeName: "Text Block"
  },
  {
    tag: "gx-le-section",
    type: "section",
    typeName: "Section"
  },
  {
    tag: "gx-le-simple-grid",
    type: "simplegrid",
    typeName: "Simple Grid"
  },
  {
    type: "tab",
    typeName: "Tab"
  },
  {
    tag: {
      mappings: {
        Absolute: "gx-le-canvas-table",
        Flex: "gx-le-flex-table",
        Responsive: "gx-le-responsive-table",
        Tabular: "gx-le-tabular-table"
      },
      property: "@tableType"
    },
    type: "table",
    typeName: "Table"
  },
  {
    tag: "gx-le-user-control",
    type: "ucw",
    typeName: "User Control"
  }
];

export interface IControlDefinition {
  tag?:
    | string
    | {
        property: string;
        mappings: {
          [propertyValue: string]: string;
        };
      };
  type: string;
  typeName: string;
  metadataTransform?: (
    control: GeneXusAbstractLayout.IControl
  ) => GeneXusAbstractLayout.IControl;
}

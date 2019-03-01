export const controlsDefinition: IControlDefinition[] = [
  {
    tag: "gx-le-action",
    type: "action"
  },
  {
    type: "actiongroup"
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
    tag: "gx-le-errorviewer",
    type: "errorviewer"
  },
  {
    type: "embeddedpage"
  },
  {
    tag: "gx-le-freestyle-grid",
    type: "grid"
  },
  {
    tag: "gx-le-group",
    type: "group"
  },
  {
    tag: "gx-le-horizontal-rule",
    type: "horizontalrule"
  },
  {
    tag: "gx-le-hyperlink",
    type: "hyperlink"
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
    type: "tab"
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
    type: "table"
  },
  {
    tag: "gx-le-user-control",
    type: "ucw"
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
  metadataTransform?: (
    control: GeneXusAbstractLayout.IControl
  ) => GeneXusAbstractLayout.IControl;
}

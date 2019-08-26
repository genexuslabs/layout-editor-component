declare module GeneXusAbstractLayout {
  export interface Data extends IControl {
    "@attribute": string;
    "@labelPosition": string;
    "@labelCaption": string;
    "@readonly": string;
    "@class": string;
    "@inviteMessage": string;
    "@ReturnOnClick": string;
    "@WebUserControlProperties": string;
    "@controlNameForStencil": string;
  }

  export interface Action extends IControl {
    "@onClickEvent": string;
    "@caption": string;
    "@ControlType": string;
    "@class": string;
  }

  export interface Embeddedpage extends IControl {
    "@class": string;
  }

  export interface Errorviewer extends IControl {
    "@class": string;
    "@visible": string;
  }

  export interface Horizontalrule extends IControl {}

  export interface Hyperlink extends IControl {
    "@text": string;
    "@class": string;
    "@controlNameForStencil": string;
  }

  export interface Image extends IControl {
    "@image": string;
    imgSrc: string;
    "@class": string;
  }

  export interface Textblock extends IControl {
    "@caption": string;
    "@class": string;
  }

  export interface Component extends IControl {
    "@webObject": string;
    "@parameters": string;
  }

  export interface Grid extends IControl {
    "@class": string;
    "@collection": string;
    "@rows": string;
    "@dataSelector": string;
    "@defaultTable": string;
    table: Table;
  }

  export interface SimpleGridItem {
    "@id": string;
    "@controlName": string;
    "@attribute": string;
    "@titleExp": string;
    "@class": string;
    "@WebUserControlProperties": string;
    "@controlNameForStencil": string;
    controlType: string;
  }

  export interface Simplegrid extends IControl {
    "@class": string;
    "@collection": string;
    item: [SimpleGridItem];
    acceptedElementTypes?: string[];
  }

  export interface Group extends IControl {
    "@caption": string;
    "@class": string;
    table: Table;
  }

  export interface SectionItem extends IContainer {
    "@id": string;
  }

  export interface Section extends IControl {
    "@class": string;
    item: SectionItem[];
  }

  export interface TabItem extends IContainer {
    "@id": string;
    "@itemControlName": string;
    "@caption": string;
    table: Table;
  }

  export interface Tab extends IControl {
    "@class": string;
    "@visible": string;
    "@historyManagement": string;
    item: TabItem[];
  }

  export interface Actiongroup extends IControl {
    "@visible": string;
  }

  export interface Ucw extends IControl {
    "@gxControlType": string;
  }

  export interface UcwContainer extends Ucw, IContainer {}

  export interface IContainer {
    childControlType: string;
    controlType: string;
    data?: Data;
    action?: Action;
    embeddedpage?: Embeddedpage;
    errorviewer?: Errorviewer;
    horizontalrule?: Horizontalrule;
    hyperlink?: Hyperlink;
    image?: Image;
    textblock?: Textblock;
    component?: Component;
    table?: Table;
    grid?: Grid;
    simplegrid?: Simplegrid;
    group?: Group;
    section?: Section;
    tab?: Tab;
    actiongroup?: Actiongroup;
    ucw?: Ucw | UcwContainer;
  }

  export interface IControl {
    "@id": string;
    "@controlName": string;
    "@PATTERN_ELEMENT_CUSTOM_PROPERTIES"?: string;
    CustomProperties?: any;
  }

  export interface Cell extends IContainer {
    "@id": string;
    "@cellControlName": string;
    "@hAlign": string;
    "@vAlign": string;
  }

  export interface Row {
    "@id": string;
    "@rowHeight": string;
    "@rowHeightWeb": string;
    cell: Cell[];
  }

  export interface Table extends IControl {
    "@id": string;
    "@width": string;
    "@height": string;
    "@class": string;
    "@tableType": string;
    "@formClass": string;
    "@responsiveSizes": string;
    "@rowHeights": string;
    "@isStencil": string;
    row: Row[];
  }

  export interface ActionGroupItemAction {
    "@controlName": string;
    "@onClickEvent": string;
    "@caption": string;
    "@ControlType": string;
    "@class": string;
    "@PATTERN_ELEMENT_CUSTOM_PROPERTIES": string;
  }

  export interface ActionGroupItem {
    action: ActionGroupItemAction;
  }

  export interface ActionGroup {
    "@controlName": string;
    "@class": string;
    "@controlWebType": string;
    "@caption": string;
    "@image": string;
    item: ActionGroupItem;
  }

  export interface ActionGroups {
    actionGroup: ActionGroup;
  }

  export interface Layout {
    "@id": string;
    "@Type": string;
    "@Orientation": string;
    childControlType: string;
    controlType: string;
    table: Table;
    actionGroups?: ActionGroups;
  }

  export interface Model {
    layout: Layout;
  }
}

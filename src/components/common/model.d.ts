declare module GeneXusAbstractLayout {
  export interface Data {
    "@controlName": string;
    "@attribute": string;
    "@labelPosition": string;
    "@labelCaption": string;
    "@readonly": string;
    "@class": string;
    "@inviteMessage": string;
    "@ReturnOnClick": string;
    "@WebUserControlProperties": string;
    "@controlNameForStencil": string;
    "@PATTERN_ELEMENT_CUSTOM_PROPERTIES": string;
    "@id": string;
  }

  export interface Action {
    "@controlName": string;
    "@onClickEvent": string;
    "@caption": string;
    "@ControlType": string;
    "@class": string;
    "@PATTERN_ELEMENT_CUSTOM_PROPERTIES": string;
    "@id": string;
  }

  export interface Embeddedpage {
    "@controlName": string;
    "@class": string;
    "@PATTERN_ELEMENT_CUSTOM_PROPERTIES": string;
    "@id": string;
  }

  export interface Errorviewer {
    "@controlName": string;
    "@class": string;
    "@visible": string;
    "@PATTERN_ELEMENT_CUSTOM_PROPERTIES": string;
    "@id": string;
  }

  export interface Horizontalrule {
    "@id": string;
  }

  export interface Hyperlink {
    "@text": string;
    "@class": string;
    "@controlNameForStencil": string;
    "@id": string;
  }

  export interface Image {
    "@controlName": string;
    "@image": string;
    imgSrc: string;
    "@class": string;
    "@PATTERN_ELEMENT_CUSTOM_PROPERTIES": string;
    "@id": string;
  }

  export interface Textblock {
    "@controlName": string;
    "@caption": string;
    "@class": string;
    "@PATTERN_ELEMENT_CUSTOM_PROPERTIES": string;
    "@id": string;
  }

  export interface Component {
    "@controlName": string;
    "@webObject": string;
    "@parameters": string;
    "@id": string;
  }

  export interface Grid {
    "@id": string;
    "@controlName": string;
    "@class": string;
    "@collection": string;
    "@rows": string;
    "@dataSelector": string;
    "@defaultTable": string;
    "@PATTERN_ELEMENT_CUSTOM_PROPERTIES": string;
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
    "@PATTERN_ELEMENT_CUSTOM_PROPERTIES": string;
  }

  export interface Simplegrid {
    "@id": string;
    "@controlName": string;
    "@class": string;
    "@collection": string;
    "@PATTERN_ELEMENT_CUSTOM_PROPERTIES": string;
    item: [SimpleGridItem];
    acceptedElementTypes?: string[];
  }

  export interface Group {
    "@id": string;
    "@controlName": string;
    "@caption": string;
    "@class": string;
    "@PATTERN_ELEMENT_CUSTOM_PROPERTIES": string;
    table: Table;
  }

  export interface SectionItem extends Container {
    "@id": string;
  }

  export interface Section {
    "@controlName": string;
    "@class": string;
    "@PATTERN_ELEMENT_CUSTOM_PROPERTIES": string;
    "@id": string;
    item: SectionItem;
  }

  export interface TabItem {
    "@id": string;
    "@itemControlName": string;
    "@caption": string;
    table: Table;
  }

  export interface Tab {
    "@id": string;
    "@controlName": string;
    "@class": string;
    "@visible": string;
    "@historyManagement": string;
    item: TabItem[];
  }

  export interface Actiongroup {
    "@controlName": string;
    "@visible": string;
    "@id": string;
  }

  export interface Ucw {
    "@gxControlType": string;
    "@PATTERN_ELEMENT_CUSTOM_PROPERTIES": string;
    "@id": string;
  }

  export interface Container {
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
    ucw?: Ucw;
  }

  export interface Cell extends Container {
    "@id": string;
    "@cellControlName": string;
    "@hAlign": string;
    "@vAlign": string;
  }

  export interface Row {
    "@id": string;
    "@rowHeight": string;
    "@rowHeightWeb": string;
    cell: Cell;
  }

  export interface Table {
    "@id": string;
    "@controlName": string;
    "@width": string;
    "@height": string;
    "@class": string;
    "@tableType": string;
    "@formClass": string;
    "@responsiveSizes": string;
    "@rowHeights": string;
    "@isStencil": string;
    "@PATTERN_ELEMENT_CUSTOM_PROPERTIES": string;
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
    table: Table;
    actionGroups?: ActionGroups;
  }

  export interface Model {
    layout: Layout;
  }
}

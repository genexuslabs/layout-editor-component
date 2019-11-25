declare namespace GeneXusAbstractLayout {
  export interface Data extends Control {
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

  export interface Action extends Control {
    "@onClickEvent": string;
    "@caption": string;
    "@ControlType": string;
    "@class": string;
  }

  export interface Embeddedpage extends Control {
    "@class": string;
  }

  export interface Errorviewer extends Control {
    "@class": string;
    "@visible": string;
  }

  export interface Horizontalrule extends Control {}

  export interface Hyperlink extends Control {
    "@text": string;
    "@class": string;
    "@controlNameForStencil": string;
  }

  export interface Image extends Control {
    "@image": string;
    imgSrc: string;
    "@class": string;
  }

  export interface Textblock extends Control {
    "@caption": string;
    "@class": string;
  }

  export interface Component extends Control {
    "@webObject": string;
    "@parameters": string;
  }

  export interface Grid extends Control {
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

  export interface Simplegrid extends Control {
    "@class": string;
    "@collection": string;
    item: [SimpleGridItem];
    acceptedElementTypes?: string[];
  }

  export interface Group extends Control {
    "@caption": string;
    "@class": string;
    table: Table;
  }

  export interface SectionItem extends Container {
    "@id": string;
  }

  export interface Section extends Control {
    "@class": string;
    item: SectionItem[];
  }

  export interface TabItem extends Container {
    "@id": string;
    "@itemControlName": string;
    "@caption": string;
    table: Table;
  }

  export interface Tab extends Control {
    "@class": string;
    "@visible": string;
    "@historyManagement": string;
    item: TabItem[];
  }

  export interface Actiongroup extends Control {
    "@visible": string;
  }

  export interface Ucw extends Control {
    "@gxControlType": string;
  }

  export interface UcwContainer extends Ucw, Container {}

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
    ucw?: Ucw | UcwContainer;
  }

  export interface Control {
    "@id": string;
    "@controlName": string;
    "@class": string;
    "@PATTERN_ELEMENT_CUSTOM_PROPERTIES"?: string;
    isRootControl?: boolean;
    isPartControl?: boolean;
    CustomProperties?: any;
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
    cell: Cell[];
  }

  export interface Table extends Control {
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

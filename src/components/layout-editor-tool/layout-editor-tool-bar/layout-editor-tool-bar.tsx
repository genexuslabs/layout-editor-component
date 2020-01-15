import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  State,
  Watch,
  h
} from "@stencil/core";
import {
  getBreadcrumb,
  getSelectedData,
  isControlDragActiveTarget,
  isControlDraggable
} from "../../layout-editor/layout-editor-helpers";

import { LayoutEditorToolArrangeObserver } from "../layout-editor-tool-arrange/layout-editor-tool-arrange-observer";
import { LayoutEditorToolSelectEvent } from "../layout-editor-tool-commons";

@Component({
  styleUrl: "layout-editor-tool-bar.scss",
  tag: "gx-le-tool-bar"
})
export class LayoutEditorToolBar {
  @Element() el: HTMLElement;
  @Prop() control: HTMLElement;
  @State() parentControl: HTMLElement;
  @State() dragHidden = true;
  @State() buttonsHidden = true;
  @State() buttonInfoHidden = true;
  @State() buttonTaskHidden = true;
  @State() buttonSelectHidden = true;

  componentWillLoad() {
    this.initialize();
  }

  componentDidLoad() {
    LayoutEditorToolArrangeObserver.observe(this.el);
  }

  componentDidUnload() {
    LayoutEditorToolArrangeObserver.unobserve(this.el);
  }

  @Watch("control")
  watchControl() {
    this.initialize();
  }

  @Event() select: EventEmitter<LayoutEditorToolSelectEvent>;

  handleSelectParentClick(event: MouseEvent) {
    this.select.emit({
      add: event.ctrlKey,
      controlId: getSelectedData(this.parentControl).controlId
    });
    event.stopPropagation();
  }

  private initialize() {
    const isDragTarget = isControlDragActiveTarget(this.control);

    this.initializeButtonSelect();

    this.dragHidden = isDragTarget || !isControlDraggable(this.control);
    this.buttonSelectHidden = isDragTarget || !this.parentControl;
    this.buttonsHidden =
      this.buttonInfoHidden && this.buttonTaskHidden && this.buttonSelectHidden;
  }

  private initializeButtonSelect() {
    this.parentControl = getBreadcrumb(this.control)[0];
  }

  render() {
    return [
      <div class="bar">
        <gx-le-tool-drag
          class="drag"
          control={this.control}
          hidden={this.dragHidden}
        />
        <gx-le-tool-identity class="identity" control={this.control} />
        <ul class="buttons" hidden={this.buttonsHidden}>
          <li class="info" hidden={this.buttonInfoHidden}>
            <gxg-button type="primary-icon-only">
              <gxg-icon slot="icon" type="more-info"></gxg-icon>
            </gxg-button>
          </li>
          <li class="task" hidden={this.buttonTaskHidden}>
            <gxg-button type="primary-icon-only">
              <gxg-icon slot="icon" type="settings"></gxg-icon>
            </gxg-button>
          </li>
          <li class="select" hidden={this.buttonSelectHidden}>
            <gxg-button
              type="primary-icon-only"
              class="parent"
              onClick={this.handleSelectParentClick.bind(this)}
            >
              <gxg-icon slot="icon" type="level-up"></gxg-icon>
            </gxg-button>
            <gx-le-tool-breadcrumb
              control={this.control}
              class="location-top"
              data-gx-le-tool-arrange-locations="location-top location-bottom"
            />
          </li>
        </ul>
      </div>,
      <div class="arrow" />
    ];
  }
}

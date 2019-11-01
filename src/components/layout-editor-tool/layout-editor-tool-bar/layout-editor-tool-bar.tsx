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

import { ILayoutEditorToolSelectEvent } from "../layout-editor-tool-commons";
import { LayoutEditorToolArrangeObserver } from "../layout-editor-tool-arrange/layout-editor-tool-arrange-observer";

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

  @Event() select: EventEmitter<ILayoutEditorToolSelectEvent>;

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
        <gx-le-tool-drag control={this.control} hidden={this.dragHidden} />
        <gx-le-tool-identity class="identity" control={this.control} />
        <ul class="buttons" hidden={this.buttonsHidden}>
          <li class="info" hidden={this.buttonInfoHidden}>
            <button type="button" />
          </li>
          <li class="task" hidden={this.buttonTaskHidden}>
            <button type="button" />
          </li>
          <li class="select" hidden={this.buttonSelectHidden}>
            <button
              type="button"
              class="parent"
              onClick={this.handleSelectParentClick.bind(this)}
            />
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

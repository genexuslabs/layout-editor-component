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
  getSelectedData
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
  @State() buttonInfoHidden = true;
  @State() buttonTaskHidden = true;
  @State() buttonSelectHidden = true;

  componentWillLoad() {
    this.initializeButtonSelect();
  }

  componentDidLoad() {
    LayoutEditorToolArrangeObserver.observe(this.el);
  }

  componentDidUnload() {
    LayoutEditorToolArrangeObserver.unobserve(this.el);
  }

  @Watch("control")
  watchControl() {
    this.initializeButtonSelect();
  }

  @Event() select: EventEmitter<ILayoutEditorToolSelectEvent>;

  handleSelectParentClick(event: MouseEvent) {
    this.select.emit({
      add: event.ctrlKey,
      controlId: getSelectedData(this.parentControl).controlId
    });
    event.stopPropagation();
  }

  private initializeButtonSelect() {
    this.parentControl = getBreadcrumb(this.control)[0];
    this.buttonSelectHidden = this.parentControl ? false : true;
  }

  render() {
    return [
      <div class="bar">
        <gx-le-tool-drag control={this.control} />
        <gx-le-tool-identity class="identity" control={this.control} />
        <ul class="buttons">
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

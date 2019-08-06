import {
  Component,
  Event,
  EventEmitter,
  Prop,
  State,
  Watch
} from "@stencil/core";
import {
  getBreadcrumb,
  getSelectedData
} from "../../layout-editor/layout-editor-helpers";

import { ILayoutEditorToolSelectEvent } from "../layout-editor-tool-commons";

@Component({
  styleUrl: "layout-editor-tool-bar.scss",
  tag: "gx-le-tool-bar"
})
export class LayoutEditorToolBar {
  @Prop() control: HTMLElement;
  @State() parentControl: HTMLElement;

  itemButtonInfo: HTMLElement;
  itemButtonTask: HTMLElement;
  itemButtonSelect: HTMLElement;

  componentWillLoad() {
    this.initializeButtonParent();
  }

  @Watch("control")
  watchControl() {
    this.initializeButtonParent();
    this.refreshButtonsStatus();
  }

  @Event() select: EventEmitter<ILayoutEditorToolSelectEvent>;

  handleSelectParentClick(event: MouseEvent) {
    this.select.emit({
      add: event.ctrlKey,
      controlId: getSelectedData(this.parentControl).controlId
    });
    event.stopPropagation();
  }

  private initializeButtonParent() {
    this.parentControl = getBreadcrumb(this.control)[0];
  }

  private refreshButtonsStatus() {
    if (this.parentControl) {
      this.itemButtonSelect.classList.remove("hidden");
    } else {
      this.itemButtonSelect.classList.add("hidden");
    }
  }

  render() {
    return [
      <div class="bar">
        <gx-le-tool-identity class="identity" control={this.control} />
        <ul class="buttons">
          <li class="info hidden" ref={el => (this.itemButtonInfo = el)}>
            <button />
          </li>
          <li class="task hidden" ref={el => (this.itemButtonTask = el)}>
            <button />
          </li>
          <li class="select hidden" ref={el => (this.itemButtonSelect = el)}>
            <button
              class="parent"
              onClick={this.handleSelectParentClick.bind(this)}
            />
            <div class="breadcrumb-container">
              <gx-le-tool-breadcrumb control={this.control} />
            </div>
          </li>
        </ul>
      </div>,
      <div class="arrow" />
    ];
  }
}

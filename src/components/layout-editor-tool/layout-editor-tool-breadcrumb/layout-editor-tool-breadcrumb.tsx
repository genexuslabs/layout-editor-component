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
  styleUrl: "layout-editor-tool-breadcrumb.scss",
  tag: "gx-le-tool-breadcrumb"
})
export class LayoutEditorToolBreadcrumb {
  @Element() el: HTMLElement;
  @Prop() control: HTMLElement;
  @State() breadcrumb: HTMLElement[] = [];

  componentWillLoad() {
    this.loadBreadcrumb();
  }

  componentDidLoad() {
    LayoutEditorToolArrangeObserver.observe(this.el);
  }

  componentDidUnload() {
    LayoutEditorToolArrangeObserver.unobserve(this.el);
  }

  @Watch("control")
  watchControl() {
    this.loadBreadcrumb();
  }

  @Event() select: EventEmitter<ILayoutEditorToolSelectEvent>;

  handleBreadcrumbClick(control: HTMLElement, event: MouseEvent) {
    this.select.emit({
      add: event.ctrlKey,
      controlId: getSelectedData(control).controlId
    });
    event.stopPropagation();
  }

  private loadBreadcrumb() {
    this.breadcrumb = getBreadcrumb(this.control);
  }

  render() {
    return (
      <ul class="list">
        {this.breadcrumb.slice(0, 3).map(control => (
          <li
            class="item"
            onClick={this.handleBreadcrumbClick.bind(this, control)}
          >
            <gx-le-tool-identity class="identity" control={control} />
          </li>
        ))}
      </ul>
    );
  }
}

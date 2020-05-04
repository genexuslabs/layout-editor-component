import { Component, Element, Listen, Prop, Watch, h } from "@stencil/core";

import { LayoutEditorToolDimensionType } from "../layout-editor-tool-commons";
import { findContainedControl } from "../../layout-editor/layout-editor-helpers";

@Component({
  styleUrl: "layout-editor-tool-selection.scss",
  tag: "gx-le-tool-selection"
})
export class LayoutEditorToolSelection {
  @Element() el: HTMLElement;
  @Prop() control: HTMLElement;
  @Prop() loadBar: boolean;
  @Prop() loadBox: boolean;
  @Prop() loadDimension: boolean;
  @Prop() changeHighlight: boolean;
  @Prop() changeSmooth: boolean;
  @Prop() preview: boolean;

  resizeObserver: ResizeObserver = new window.ResizeObserver(
    this.handleResizeObserver.bind(this)
  );

  @Listen("scroll", { target: "window", passive: true })
  @Listen("resize", { target: "window", passive: true })
  @Listen("dragstart", { target: "window", passive: true })
  @Listen("dragenter", { target: "window", passive: true })
  @Listen("dragend", { target: "window", passive: true })
  handleWindowEvents() {
    this.smoothSuspend();
    this.updatePosition();
    this.smoothResume();
  }

  handleResizeObserver() {
    this.smoothSuspend();
    this.updatePosition();
    this.smoothResume();
  }

  @Watch("control")
  watchControl(selectedControl: HTMLElement, unselectedControl: HTMLElement) {
    this.highlight();
    this.updatePosition();
    this.monitorResize(selectedControl, unselectedControl);
  }

  componentDidLoad() {
    this.smooth();
    this.highlight();
    this.updatePosition();
    this.monitorResize(this.control);
  }

  private monitorResize(
    observeControl: HTMLElement,
    unobserveControl?: HTMLElement
  ) {
    if (unobserveControl) {
      this.resizeObserver.unobserve(this.getSelectElement(unobserveControl));
    }
    if (observeControl) {
      this.resizeObserver.observe(this.getSelectElement(observeControl));
    }
  }

  private smooth() {
    if (this.changeSmooth) {
      this.el.classList.add("smooth");
    }
  }

  private smoothSuspend() {
    if (this.changeSmooth) {
      this.el.classList.remove("smooth");
    }
  }

  private smoothResume() {
    if (this.changeSmooth) {
      window.requestAnimationFrame(() => {
        this.el.classList.add("smooth");
      });
    }
  }

  private highlight() {
    if (this.changeHighlight) {
      this.el.classList.remove("highlight");
      window.requestAnimationFrame(() => {
        this.el.classList.add("highlight");
      });
    }
  }

  private updatePosition() {
    if (this.control) {
      const rect = this.getSelectElement(this.control).getBoundingClientRect();

      this.el.style.top = `${rect.top}px`;
      this.el.style.left = `${rect.left}px`;
      this.el.style.width = `${rect.width}px`;
      this.el.style.height = `${rect.height}px`;

      /* workaround to bug of chromium with position:sticky */
      this.el.style.setProperty(
        "--sticky-top",
        `${rect.top >= 0 ? 0 : rect.top * -1}px`
      );
      /* end of workaround */
    }
  }

  private getSelectElement(controlWrapper: HTMLElement) {
    if (this.preview) {
      return findContainedControl(controlWrapper);
    } else {
      return controlWrapper;
    }
  }

  render() {
    return [
      this.loadBar && (
        <gx-le-tool-bar
          class="location-outside-top"
          data-gx-le-tool-arrange-locations="location-outside-top location-outside-right location-outside-bottom location-outside-left location-inside-sticky"
          control={this.control}
        />
      ),
      this.loadBox && <gx-le-tool-box control={this.control} />,
      this.loadDimension && (
        <gx-le-tool-dimension
          control={this.control}
          type={LayoutEditorToolDimensionType.Height}
        />
      ),
      this.loadDimension && (
        <gx-le-tool-dimension
          control={this.control}
          type={LayoutEditorToolDimensionType.Width}
        />
      )
    ];
  }
}

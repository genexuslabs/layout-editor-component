import { Component, Element, Listen, Prop, Watch, h } from "@stencil/core";

import { LayoutEditorToolDimensionType } from "../layout-editor-tool-commons";

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

  arrange: HTMLGxLeToolArrangeControllerElement;

  @Listen("scroll", { target: "window", passive: true })
  handleScroll() {
    this.smoothSuspend();
    this.updatePosition();
    this.smoothResume();
  }

  @Listen("resize", { target: "window", passive: true })
  handleResize() {
    this.smoothSuspend();
    this.updatePosition();
    this.smoothResume();
  }

  @Watch("control")
  watchControl() {
    this.highlight();
    this.updatePosition();
    this.refreshArrange();
  }

  componentDidLoad() {
    this.smooth();
    this.highlight();
    this.updatePosition();
    this.refreshArrange();
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
      const rect = this.control.getBoundingClientRect();

      this.el.style.top = rect.top + "px";
      this.el.style.left = rect.left + "px";
      this.el.style.width = rect.width + "px";
      this.el.style.height = rect.height + "px";
    }
  }

  private refreshArrange() {
    if (this.arrange) {
      window.requestAnimationFrame(() => {
        this.arrange.refresh();
      });
    }
  }

  render() {
    return [
      this.loadBar && (
        <gx-le-tool-arrange-controller
          selection={this.el}
          ref={el =>
            (this.arrange = el as HTMLGxLeToolArrangeControllerElement)
          }
        />
      ),
      this.loadBar && (
        <gx-le-tool-bar class="location-none" control={this.control} />
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

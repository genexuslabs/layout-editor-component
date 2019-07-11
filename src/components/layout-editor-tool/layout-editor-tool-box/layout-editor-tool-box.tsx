import { Component, Element, Prop, Watch } from "@stencil/core";

@Component({
  styleUrl: "layout-editor-tool-box.scss",
  tag: "gx-le-tool-box"
})
export class LayoutEditorToolBox {
  @Element() el: HTMLElement;
  @Prop() control: HTMLElement;

  @Watch("control")
  watchControl() {
    this.updateBox();
  }

  componentDidLoad() {
    this.updateBox();
  }

  private updateBox() {
    const computedStyle = window.getComputedStyle(this.control);

    this.el.style.setProperty(
      "--margin-top",
      computedStyle.getPropertyValue("margin-top")
    );
    this.el.style.setProperty(
      "--margin-right",
      computedStyle.getPropertyValue("margin-right")
    );
    this.el.style.setProperty(
      "--margin-bottom",
      computedStyle.getPropertyValue("margin-bottom")
    );
    this.el.style.setProperty(
      "--margin-left",
      computedStyle.getPropertyValue("margin-left")
    );

    this.el.style.setProperty(
      "--padding-top",
      computedStyle.getPropertyValue("padding-top")
    );
    this.el.style.setProperty(
      "--padding-right",
      computedStyle.getPropertyValue("padding-right")
    );
    this.el.style.setProperty(
      "--padding-bottom",
      computedStyle.getPropertyValue("padding-bottom")
    );
    this.el.style.setProperty(
      "--padding-left",
      computedStyle.getPropertyValue("padding-left")
    );
  }

  render() {
    return [
      <div class="margin top" />,
      <div class="margin right" />,
      <div class="margin bottom" />,
      <div class="margin left" />,
      <div class="padding top" />,
      <div class="padding right" />,
      <div class="padding bottom" />,
      <div class="padding left" />
    ];
  }
}

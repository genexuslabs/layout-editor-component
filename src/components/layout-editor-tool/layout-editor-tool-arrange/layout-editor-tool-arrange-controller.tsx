import { Component, Element, Method, Prop } from "@stencil/core";

@Component({
  styleUrl: "layout-editor-tool-arrange-controller.scss",
  tag: "gx-le-tool-arrange-controller"
})
export class LayoutEditorToolArrangeController {
  @Element() el: HTMLElement;
  @Prop() selection: HTMLElement;

  bar: HTMLElement;
  barPosition = BarPosition.NONE;

  placeholderBarOutsideTop: HTMLElement;
  placeholderBarOutsideRight: HTMLElement;
  placeholderBarOutsideBottom: HTMLElement;
  placeholderBarOutsideLeft: HTMLElement;
  placeholderBarInsideTop: HTMLElement;

  isAvailableBarOutsideTop = false;
  isAvailableBarOutsideRight = false;
  isAvailableBarOutsideBottom = false;
  isAvailableBarOutsideLeft = false;
  isAvailableBarInsideTop = false;

  intersection = new IntersectionObserver(
    entries => {
      this.handleIntersectionObserver(entries);
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: [1]
    }
  );

  componentDidLoad() {
    this.bar = this.selection.querySelector("gx-le-tool-bar");

    this.intersection.observe(this.placeholderBarOutsideTop);
    this.intersection.observe(this.placeholderBarOutsideRight);
    this.intersection.observe(this.placeholderBarOutsideBottom);
    this.intersection.observe(this.placeholderBarOutsideLeft);
    this.intersection.observe(this.placeholderBarInsideTop);
  }

  @Method()
  async refresh() {
    this.refreshPlaceholderBarSize();
  }

  refreshPlaceholderBarSize() {
    const rectangle = this.bar.getBoundingClientRect();

    this.el.style.setProperty(
      "--placeholder-bar-width",
      rectangle.width + "px"
    );
    this.el.style.setProperty(
      "--placeholder-bar-height",
      rectangle.height + "px"
    );
  }

  handleIntersectionObserver(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      const el = entry.target as HTMLElement;
      const isAvailable = entry.intersectionRatio === 1;

      switch (el) {
        case this.placeholderBarOutsideTop:
          this.isAvailableBarOutsideTop = isAvailable;
          break;
        case this.placeholderBarOutsideRight:
          this.isAvailableBarOutsideRight = isAvailable;
          break;
        case this.placeholderBarOutsideBottom:
          this.isAvailableBarOutsideBottom = isAvailable;
          break;
        case this.placeholderBarOutsideLeft:
          this.isAvailableBarOutsideLeft = isAvailable;
          break;
        case this.placeholderBarInsideTop:
          this.isAvailableBarInsideTop = isAvailable;
          break;
      }
    });

    this.arrange();
  }

  arrange() {
    let position: BarPosition;

    if (this.isAvailableBarOutsideTop) {
      position = BarPosition.OUTSIDE_TOP;
    } else if (this.isAvailableBarOutsideRight) {
      position = BarPosition.OUTSIDE_RIGHT;
    } else if (this.isAvailableBarOutsideBottom) {
      position = BarPosition.OUTSIDE_BOTTOM;
    } else if (this.isAvailableBarOutsideLeft) {
      position = BarPosition.OUTSIDE_LEFT;
    } else if (this.isAvailableBarInsideTop) {
      position = BarPosition.INSIDE_TOP;
    } else {
      position = BarPosition.NONE;
    }

    this.bar.classList.replace(this.barPosition, position);
    this.barPosition = position;
  }

  render() {
    return [
      <div
        class="placeholder-bar location-outside-top"
        ref={el => (this.placeholderBarOutsideTop = el)}
      />,
      <div
        class="placeholder-bar location-outside-right"
        ref={el => (this.placeholderBarOutsideRight = el)}
      />,
      <div
        class="placeholder-bar location-outside-bottom"
        ref={el => (this.placeholderBarOutsideBottom = el)}
      />,
      <div
        class="placeholder-bar location-outside-left"
        ref={el => (this.placeholderBarOutsideLeft = el)}
      />,
      <div
        class="placeholder-bar location-inside-top"
        ref={el => (this.placeholderBarInsideTop = el)}
      />
    ];
  }
}

enum BarPosition {
  OUTSIDE_TOP = "location-outside-top",
  OUTSIDE_RIGHT = "location-outside-right",
  OUTSIDE_BOTTOM = "location-outside-bottom",
  OUTSIDE_LEFT = "location-outside-left",
  INSIDE_TOP = "location-inside-top",
  NONE = "location-none"
}

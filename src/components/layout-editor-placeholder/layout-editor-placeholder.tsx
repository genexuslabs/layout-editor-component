import { Component, Element } from "@stencil/core";
// tslint:disable-next-line
import { IComponent } from "@genexus/web-controls-library/dist/types/components/common/interfaces";

@Component({
  shadow: false,
  styleUrl: "layout-editor-placeholder.scss",
  tag: "gx-layout-editor-placeholder"
})
export class LayoutEditorPlaceholder implements IComponent {
  @Element() element: HTMLElement;

  render() {
    return <slot />;
  }
}

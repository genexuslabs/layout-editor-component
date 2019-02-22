import { Component, Element, State } from "@stencil/core";
import sampleModel from "./sample-model.json";
import { Fragment } from "../common/util";

@Component({
  shadow: false,
  styleUrl: "layout-editor-test.scss",
  tag: "gx-layout-editor-test"
})
export class LayoutEditorTest {
  @Element() element: HTMLElement;

  @State() currentModel: any;
  @State() errorMessage: string;
  @State() previewMode = false;

  componentDidLoad() {
    const editElement: any = this.element.querySelector("gx-edit");
    editElement.value = JSON.stringify(sampleModel);
  }

  render() {
    return (
      <Fragment>
        <form
          class={{
            hidden: !!this.currentModel
          }}
        >
          {this.errorMessage ? (
            <gx-message type="error">{this.errorMessage}</gx-message>
          ) : null}
          <gx-edit
            multiline="true"
            placeholder="Enter a GeneXus abstract form model in JSON format"
          />
          <gx-button
            id="btn-load-model"
            onClick={this.handleLoadModelButtonClick.bind(this)}
            class="le-test-button"
          >
            Load
          </gx-button>
          <gx-button
            id="btn-clear"
            onClick={this.handleClearButtonClick.bind(this)}
            class="le-test-button"
          >
            Clear
          </gx-button>
        </form>
        <div
          id="options-bar"
          class={{
            hidden: !this.currentModel
          }}
        >
          <gx-button
            id="btn-reset-model"
            class="le-test-button"
            onClick={this.handleResetButtonClick.bind(this)}
            size="small"
          >
            Reset
          </gx-button>
          <gx-switch
            caption="Preview mode"
            class="le-test-button"
            onClick={this.handlePreviewClick.bind(this)}
          />
        </div>
        <gx-layout-editor
          class={{
            hidden: !this.currentModel,
            preview: this.previewMode
          }}
          model={this.currentModel}
        />
      </Fragment>
    );
  }

  handleLoadModelButtonClick(event: Event) {
    event.preventDefault();
    const editElement: any = this.element.querySelector("gx-edit");
    this.errorMessage = "";
    try {
      const model = JSON.parse(editElement.value);
      if (model) {
        this.currentModel = model;
      }
    } catch (e) {
      this.currentModel = null;
      this.errorMessage = e.message;
    }
  }

  handleResetButtonClick(event: Event) {
    event.preventDefault();

    this.currentModel = null;
  }

  handleClearButtonClick(event: Event) {
    event.preventDefault();

    const editElement: any = this.element.querySelector("gx-edit");
    editElement.value = "";
  }

  handlePreviewClick(event: Event) {
    const target: any = event.target;
    this.previewMode = target.checked;
  }
}

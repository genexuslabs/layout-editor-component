import { Component, Element, State, h } from "@stencil/core";

import { Fragment } from "../common/util";
import sampleModel from "./sample-model.json";

@Component({
  shadow: false,
  styleUrls: ["layout-editor-sample.scss", "sample-model.scss"],
  tag: "gx-layout-editor-sample"
})
export class LayoutEditorSample {
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
            multiline={true}
            placeholder="Enter a GeneXus abstract form model in JSON format"
          />
          <gxg-button
            type="primary-text-only"
            id="btn-load-model"
            class="le-test-button"
            onClick={this.handleLoadModelButtonClick.bind(this)}
          >
            Load
          </gxg-button>
          <gxg-button
            type="primary-text-only"
            id="btn-clear"
            class="le-test-button"
            onClick={this.handleClearButtonClick.bind(this)}
          >
            Clear
          </gxg-button>
        </form>
        <div
          id="options-bar"
          class={{
            hidden: !this.currentModel
          }}
        >
          <gxg-button
            type="primary-text-icon"
            id="btn-reset-model"
            class="le-test-button"
            onClick={this.handleResetButtonClick.bind(this)}
          >
            <gxg-icon slot="icon" type="deleted"></gxg-icon>
            Reset
          </gxg-button>
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

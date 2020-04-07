import { LitElement, html, css } from 'lit-element';
import { MobxLitElement } from "@adobe/lit-mobx";
import { store } from "./state/store.js";
import { toJS } from "mobx";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-notification";

export class BundlerPortal extends MobxLitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: calc(100vw - 100px);
        margin: 0 auto;
        text-align: center;
      }

      main {
        flex-grow: 1;
      }

      #input {
        padding: calc(10px + 2vmin);
      }

      #grid {
        flex: 1 1 auto;
        margin: calc(10px + 2vmin);
      }
    `;
  }

  firstUpdated() {
    store.notificationEl = this.shadowRoot.querySelector('vaadin-notification');
  }

  render() {
    // <vaadin-text-field label="Dependencies" @change=${(e) => { store.newBuild = { dependencies: e } }}></vaadin-text-field>
    const builds = store.builds.map(build => Object.assign({ ...build, dependencies: JSON.stringify(build.dependencies) }))
    return html`
      <div id="input">
        <vaadin-button @click=${() => store.createBuild()}>Create Build</vaadin-button>
      </div>
      <vaadin-grid id="grid" .items=${builds}>
        <vaadin-grid-column path="id" header="id"></vaadin-grid-column>
        <vaadin-grid-column path="status" header="status"></vaadin-grid-column>
        <vaadin-grid-column path="output" header="output"></vaadin-grid-column>
        <vaadin-grid-column path="dependencies" header="dependencies"></vaadin-grid-column>
      </vaadin-grid>

      <vaadin-notification duration="4000"></vaadin-notification>
    `;
  }
}

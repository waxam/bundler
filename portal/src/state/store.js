import { observable, decorate, computed, action, autorun } from "mobx";
import { wsClient, client } from "./client.js";
import { builds, buildsSubscription, insertBuild } from "./queries.js";

class Store {
  constructor() {
    this.builds = [];
    this.newBuild = null;
    this.notificationEl = null;
  }

  createBuild() {
    this.showNotification({ text: "Creating Build" });
    client({
      query: insertBuild,
      variables: {
        dependencies: {
          "lit-element": "^2",
          "@adobe/lit-mobx": "^0",
          "@lrnwebcomponents/lrn-button": "*"
        }
      }
    })
  }

  showNotification({ text }) {
    if (this.notificationEl) {
      this.notificationEl.renderer = function(root, owner) {
        if (root.firstElementChild) {
          return;
        }
        const plainText = window.document.createTextNode(text);
        const retryBtn = window.document.createElement('vaadin-button');

        retryBtn.textContent = 'Dismiss';
        retryBtn.setAttribute('theme', 'tertiary');
        retryBtn.addEventListener('click', function() {
          owner.close();
        });

        root.appendChild(plainText);
        root.appendChild(retryBtn);
      };
      this.notificationEl.open();
    }
  }
}

decorate(Store, {
  builds: observable,
  newBuild: observable,
  createBuild: action,
  notificationEl: observable,
  showNotification: action
});

export const store = new Store();

// Set up the web socket connection
wsClient().then((socket) => {
  // Subscript to my builds
  socket.send(
    JSON.stringify({
      id: "1",
      type: "start",
      payload: {
        variables: {},
        extensions: {},
        query: buildsSubscription.loc.source.body
      },
    })
  );
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (typeof data.payload !== "undefined") {
      if (typeof data.payload.data !== "undefined") {
        // Update builds
        if (typeof data.payload.data.builds !== "undefined") {
          store.builds = data.payload.data.builds;
        }
      }
    }
  };
});

// get all of the builds
// client({ query: builds }).then(({data}) => {
//   store.builds = data.builds
// })

import { observable, decorate, computed, action, autorun } from "mobx";
import { wsClient, client } from "./client.js";
import { builds, buildsSubscription } from "./queries.js";

class Store {
  constructor() {
    this.builds = [];
  }
}

decorate(Store, {
  builds: observable,
});

export const store = new Store();

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

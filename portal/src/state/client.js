let _wsClient = null;

export const wsClient = () =>
  new Promise((res, rej) => {
    if (_wsClient) {
      return _wsClient;
    }
    // let other calls to this function know that we are already connecting.
    _wsClient = "initializing";
    const socket = new WebSocket(
      "ws://bundler.heymp.com/v1/graphql",
      "graphql-ws"
    );
    socket.onopen = () => {
      _wsClient = socket;
      // Start Connection
      socket.send(
        JSON.stringify({
          type: "connection_init",
          payload: {
            headers: {
              "content-type": "application/json",
              "x-hasura-admin-secret": "4edb8937cfba4f669881b3f2a71d86f5",
            },
          },
        })
      );
      res(socket);
    };
    socket.onclose = () => {
      _wsClient = null;
      // call ourselves
      wsClient();
    };
  });

export const client = ({ query }) => {
  return fetch("http://bundler.heymp.com/v1/graphql", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "x-hasura-admin-secret": "4edb8937cfba4f669881b3f2a71d86f5",
    },
    body: JSON.stringify({ query: query.loc.source.body }),
  }).then((res) => res.json());
};
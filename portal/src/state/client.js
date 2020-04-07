let _wsClient = null;

export const wsClient = () =>
  new Promise((res, rej) => {
    if (_wsClient) {
      return _wsClient;
    }
    // let other calls to this function know that we are already connecting.
    _wsClient = "initializing";
    const socket = new WebSocket(
      window.env.BUNDLER_ENDPOINT_WS,
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
              "x-hasura-admin-secret": window.env.HASURA_ADMIN_SECRET,
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

export const client = ({ query, variables = {} }) => {
  return fetch(window.env.BUNDLER_ENDPOINT_HTTP, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "x-hasura-admin-secret": window.env.HASURA_ADMIN_SECRET
    },
    body: JSON.stringify({ query: query.loc.source.body, variables }),
  }).then((res) => res.json());
};
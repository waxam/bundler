const fetch = require("node-fetch");
const { updateBuildStatus } = require("./queries.js");

exports.updateBuildStatus = async ({id, status}) =>
  fetch("http://host.docker.internal:8080/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*"
    },
    body: JSON.stringify({
      // use loc.source.body to get the string version of the gql statement
      // this will hopefully be replaced by .toString() in graphql-tag module soon.
      query: updateBuildStatus.loc.source.body,
      variables: {
        id,
        status
      }
    })
  })
    .then(res => res.json())
    .then(res => console.log(res));

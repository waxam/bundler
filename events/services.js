const fetch = require("node-fetch");
const { updateBuildStatus } = require("./queries.js");
const BUNDLER_SERVICE_FQDN = process.env.BUNDLER_SERVICE_ENDPOINT || "http://host.docker.internal:3000"

exports.updateBuildStatus = async ({ id, status, output }) =>
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
        status,
        output
      }
    })
  })
    .then(res => res.json())

exports.generateBuild = async ({ dependencies }) => {
  const paramsString = this.generateBuildQueryParams({ dependencies });
  return fetch(`${BUNDLER_SERVICE_FQDN}${paramsString}`)
    .then(res => res.text());
};

exports.generateBuildQueryParams = ({ dependencies }) => {
  // convert the object to a proper query string, remove quotes and curly braces
  const depString = JSON.stringify(dependencies).replace(/[{}"]/gm, "");
  return `?packages=${depString}`;
};

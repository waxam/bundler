const fetch = require("node-fetch");
const { updateBuildStatus, insertBuildLog } = require("./queries.js");
const BUNDLER_MANAGER_ENDPOINT_FQDN = process.env.BUNDLER_MANAGER_ENDPOINT_FQDN || "http://host.docker.internal:8080/v1/graphql";
const BUNDLER_EVENTS_FQDN = process.env.BUNDLER_EVENTS_FQDN;

exports.updateBuildStatus = async ({ id, status, output = null }) =>
  fetch(BUNDLER_MANAGER_ENDPOINT_FQDN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      Accept: "*/*"
    },
    body: JSON.stringify({
      // use loc.source.body to get the string version of the gql statement
      // this will hopefully be replaced by .toString() in graphql-tag module soon.
      query: updateBuildStatus.loc.source.body,
      variables: {
        status: status,
        id,
        output
      }
    })
  })
    .then(res => res.json())

exports.insertBuildLog = async ({ build_id, output }) =>
  fetch(BUNDLER_MANAGER_ENDPOINT_FQDN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      Accept: "*/*"
    },
    body: JSON.stringify({
      // use loc.source.body to get the string version of the gql statement
      // this will hopefully be replaced by .toString() in graphql-tag module soon.
      query: insertBuildLog.loc.source.body,
      variables: {
        build_id,
        output
      }
    })
  })
    .then(res => res.json())

exports.generateBuild = async ({ id, dependencies }) => {
  const paramsString = this.generateBuildQueryParams({ id, dependencies });
  return fetch(`${process.env.BUNDLER_SERVICE_FQDN}${paramsString}`)
    .then(res => res.text())
    .then(res => {
      console.log('res:', res)
      return res
    })
};

exports.generateBuildQueryParams = ({ id, dependencies }) => {
  console.log('dependencies:', dependencies)
  // convert the object to a proper query string, remove quotes and curly braces
  const depString = JSON.stringify(dependencies).replace(/[{}"]/gm, "");
  console.log('depString:', depString)
  return `?packages=${depString}&id=${id}&monitor=${BUNDLER_EVENTS_FQDN}/webhooks`;
};

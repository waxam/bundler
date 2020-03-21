const { gql } = require("apollo-server-express");

exports.createBuild = gql`
  mutation createBuild($dependencies: jsonb) {
    insert_builds(objects: { dependencies: $dependencies }) {
      affected_rows
    }
  }
`;
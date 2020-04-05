import gql from "https://cdn.pika.dev/graphql-tag@^2.10.1";

export const buildsSubscription = gql`
  subscription BuildsSubscription {
    builds(order_by: { updated_at: desc }) {
      id
      status
      dependencies
      output
    }
  }
`;

export const builds = gql`
  query Builds {
    builds(order_by: { updated_at: desc }) {
      id
      status
      dependencies
      output
    }
  }
`;

// exports.insertBuild = gql`
//   mutation createBuild($dependencies: jsonb) {
//     insert_builds(objects: {dependencies: $dependencies}) {
//       affected_rows
//     }
//   }
// `

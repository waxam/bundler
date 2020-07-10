import gql from "https://cdn.pika.dev/graphql-tag@^2.10.1";

export const buildsSubscription = gql`
  subscription BuildsSubscription {
    builds(order_by: { updated_at: desc }) {
      id
      status
      dependencies
      output
      builds_logs(limit: 1, order_by: {build: {created_at: asc}}) {
        output
      }
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
      builds_logs(limit: 1, order_by: {build: {created_at: asc}}) {
        output
      }
    }
  }
`;

export const insertBuild = gql`
  mutation createBuild($dependencies: jsonb) {
    insert_builds(objects: {dependencies: $dependencies}) {
      affected_rows
    }
  }
`

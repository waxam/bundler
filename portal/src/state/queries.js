export const buildsSubscription = `
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

export const builds = `
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

export const insertBuild = `
  mutation createBuild($dependencies: jsonb) {
    insert_builds(objects: {dependencies: $dependencies}) {
      affected_rows
    }
  }
`

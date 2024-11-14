export const GET_PLANETS = `
  query getPlanets($first: Int, $after: String) {
    allPlanets(first: $first, after: $after) {
      planets {
        id
        name
        population
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

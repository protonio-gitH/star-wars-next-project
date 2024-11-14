export const GET_PERSONS = `
  query getPeople($first: Int, $after: String) {
    allPeople(first: $first, after: $after) {
      people {
        id
        name
        gender
        homeworld {
          name
        }
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

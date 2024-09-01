import { gql } from "@apollo/client";

export const GET_PERSONS = gql`
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

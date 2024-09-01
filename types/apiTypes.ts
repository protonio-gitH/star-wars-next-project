export interface Person {
  name: string;
  id: string;
  gender: string;
  homeworld: {
    name: string;
  };
}

export interface GetPersonsData {
  allPeople: {
    people: Person[];
    totalcount: string;
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
  };
}

export interface GetPersonsVars {
  first: number;
  after: string;
}

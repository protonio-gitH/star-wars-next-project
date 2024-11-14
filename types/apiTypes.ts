export interface Person {
  name: string;
  id: string;
  gender: string;
  homeworld: {
    name: string;
  };
}

export interface Planet {
  id: string;
  name: string;
  population: string;
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

export interface GetPlanetData {
  allPlanets: {
    planets: Planet[];
    totalcount: string;
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
  };
}

export interface GetInfiniteScollVars {
  first: number;
  after: string;
}

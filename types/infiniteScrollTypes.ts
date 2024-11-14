import { RefObject } from "react";
import { ApolloError, NetworkStatus } from "@apollo/client";

import { Person, Planet } from "./apiTypes";
import { GET_PERSONS } from "@/api/people";
import { GET_PLANETS } from "@/api/planets";

export interface InfiniteScrollProps {
  first: number;
  type: string;
  gqlQuery: typeof GET_PERSONS | typeof GET_PLANETS;
}

export interface UseInfiniteScrollProps extends InfiniteScrollProps {
  scrollEnd: RefObject<HTMLDivElement>;
}

export interface UseInfiniteScrollQueryResult {
  listData: Person[] | Planet[];
  loading: boolean;
  error?: ApolloError | undefined;
  networkStatus: NetworkStatus;
  refetch: () => {};
}

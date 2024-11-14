import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";

import client from "@/api/apolloclient";
import {
  GetInfiniteScollVars,
  GetPersonsData,
  GetPlanetData,
} from "@/types/apiTypes";
import {
  UseInfiniteScrollProps,
  UseInfiniteScrollQueryResult,
} from "@/types/infiniteScrollTypes";

export const useInfifniteScroll = <
  T,
  TData extends GetPersonsData | GetPlanetData,
>({
  first,
  scrollEnd,
  type,
  gqlQuery,
}: UseInfiniteScrollProps) => {
  const QUERY = gql`
    ${gqlQuery}
  `;
  const [listData, setListData] = useState<T[]>([]);
  const { loading, error, data, fetchMore, networkStatus, refetch } = useQuery<
    TData,
    GetInfiniteScollVars
  >(QUERY, {
    variables: { first: first, after: "" },
    client,
    notifyOnNetworkStatusChange: true,
    // fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    return () => {
      setListData([]);
    };
  }, []);

  useEffect(() => {
    if (data) {
      if (type === "people" && (data as GetPersonsData).allPeople) {
        setListData((prev) => [
          ...prev,
          ...((data as GetPersonsData).allPeople.people as T[]),
        ]);
      } else if (type === "planets" && (data as GetPlanetData).allPlanets) {
        setListData((prev) => [
          ...prev,
          ...((data as GetPlanetData).allPlanets.planets as T[]),
        ]);
      }
    }
  }, [data]);

  useEffect(() => {
    const target = scrollEnd.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (
            type === "people" &&
            (data as GetPersonsData)?.allPeople.pageInfo.hasNextPage
          ) {
            const dataT = data as GetPersonsData;

            fetchMore({
              variables: {
                first: first,
                after: dataT?.allPeople.pageInfo.endCursor,
              },
              updateQuery: (prevResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prevResult;
                const prevResultT = prevResult as GetPersonsData;
                const fetchMoreResultT = fetchMoreResult as GetPersonsData;

                return {
                  ...prevResult,
                  allPeople: {
                    ...prevResultT.allPeople,
                    people: [
                      //   ...prevResultT.allPeople.people,
                      ...fetchMoreResultT.allPeople.people,
                    ],
                    pageInfo: fetchMoreResultT.allPeople.pageInfo,
                  },
                };
              },
            });
          } else if (
            type === "planet" &&
            (data as GetPlanetData)?.allPlanets.pageInfo.hasNextPage
          ) {
          }
        }
      },
      {
        root: null,
        threshold: 1.0,
      },
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [data, fetchMore]);

  return {
    listData,
    loading,
    error,
    networkStatus,
    refetch,
  } as UseInfiniteScrollQueryResult;
};

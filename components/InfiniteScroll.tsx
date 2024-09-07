"use client";
import { useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Spinner,
} from "@nextui-org/react";

import client from "@/api/apolloclient";
import { GET_PERSONS } from "@/api/people";
import {
  GetPersonsData,
  GetPersonsVars,
  InfiniteScrollProps,
  Person,
} from "@/types/apiTypes";

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ first }) => {
  const scrollEnd = useRef<HTMLDivElement>(null);
  const [listData, setListData] = useState<Person[]>([]);
  const { loading, error, data, fetchMore, networkStatus } = useQuery<
    GetPersonsData,
    GetPersonsVars
  >(GET_PERSONS, {
    variables: { first: first, after: "" },
    client,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data) {
      setListData((prev) => [...prev, ...data.allPeople.people]);
    }
  }, [data]);

  useEffect(() => {
    const target = scrollEnd.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMore({
            variables: {
              first: first,
              after: data?.allPeople.pageInfo.endCursor,
            },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prevResult;
              if (!fetchMoreResult.allPeople.pageInfo.hasNextPage)
                return prevResult;

              return {
                ...prevResult,
                allPeople: {
                  ...prevResult.allPeople,
                  people: [
                    // ...prevResult.allPeople.people,
                    ...fetchMoreResult.allPeople.people,
                  ],
                  pageInfo: fetchMoreResult.allPeople.pageInfo,
                },
              };
            },
          });
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

  if (error) return <p>Error: {error.message}</p>;
  if (loading && listData.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {listData.map((people) => (
          <Card key={people.name} className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-md">{people.name}</p>
                <p className="text-small text-default-500">{people.gender}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Homeworld: {people.homeworld.name}</p>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link
                isExternal
                showAnchorIcon
                href="https://github.com/nextui-org/nextui"
              >
                Visit source code on GitHub.
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      {networkStatus === 3 ? (
        <div className="flex justify-center items-center m-3">
          <Spinner size="md" />
        </div>
      ) : null}
      <div ref={scrollEnd} className="scroll-end" style={{ height: "1px" }} />
    </>
  );
};

export default InfiniteScroll;

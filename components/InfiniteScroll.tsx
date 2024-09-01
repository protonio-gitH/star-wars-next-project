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
import { GetPersonsData, GetPersonsVars, Person } from "@/types/apiTypes";

const InfiniteScroll = () => {
  const scrollEnd = useRef<HTMLDivElement>(null);
  const [listData, setListData] = useState<Person[]>([]);
  const { loading, error, data, fetchMore } = useQuery<
    GetPersonsData,
    GetPersonsVars
  >(GET_PERSONS, {
    variables: { first: 10, after: "" },
    client,
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
          console.log("Пользователь достиг конца контейнера или страницы");
          fetchMore({
            variables: {
              first: 10, // Подгрузить следующие 10 элементов
              after: data?.allPeople.pageInfo.endCursor, // Используйте `endCursor` для пагинации
            },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prevResult;

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
          // Здесь можно вызвать подгрузку данных или другие действия
        }
      },
      {
        root: null, // Если `null`, то наблюдает за пересечением с viewport
        threshold: 1.0, // Процент видимости элемента, который вызывает callback
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
  if (loading) {
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
      <div ref={scrollEnd} className="scroll-end" style={{ height: "1px" }} />
    </>
  );
};

export default InfiniteScroll;

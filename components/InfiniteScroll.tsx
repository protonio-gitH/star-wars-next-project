"use client";
import React, { useEffect, useRef, memo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Spinner,
} from "@nextui-org/react";

import { InfiniteScrollProps } from "@/types/infiniteScrollTypes";
import { useInfifniteScroll } from "@/hooks/useInfiniteScroll";
import {
  GetPersonsData,
  GetPlanetData,
  Person,
  Planet,
} from "@/types/apiTypes";

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  first,
  type,
  gqlQuery,
}) => {
  const scrollEnd = useRef<HTMLDivElement>(null);
  //   const [listData, setListData] = useState<Person[]>([]);
  const { listData, loading, error, networkStatus, refetch } =
    useInfifniteScroll<Person | Planet, GetPersonsData | GetPlanetData>({
      first,
      scrollEnd,
      type,
      gqlQuery,
    });

  useEffect(() => {
    refetch();
  }, [refetch, first, type, gqlQuery]);

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
        {type === "people" &&
          listData.map((people) => {
            const person = people as Person;

            return (
              <Card key={person.name} className="max-w-[400px]">
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">{person.name}</p>
                    <p className="text-small text-default-500">
                      {person.gender}
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>Homeworld: {person.homeworld.name}</p>
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
            );
          })}
      </div>
      {networkStatus === 3 ? (
        <div className="flex justify-center items-center m-3">
          <Spinner size="md" />
        </div>
      ) : null}
      <div ref={scrollEnd} className="scroll-end" style={{ height: "2px" }} />
    </>
  );
};

export default memo(InfiniteScroll);

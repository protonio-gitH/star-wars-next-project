import React from "react";

import InfiniteScroll from "@/components/InfiniteScroll";
import { GET_PERSONS } from "@/api/people";

const Persons = () => {
  return <InfiniteScroll first={9} gqlQuery={GET_PERSONS} type="people" />;
};

export default Persons;

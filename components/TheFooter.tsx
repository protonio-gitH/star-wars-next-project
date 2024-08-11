import { Link } from "@nextui-org/link";
import React from "react";

const TheFooter = () => {
  return (
    <footer className="w-full flex items-center justify-center py-3">
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://github.com/protonio-gitH"
        target="_blank"
        title="github page"
      >
        <span className="text-default-600">&copy; Created by</span>
        <p className="text-primary">protonio-gitH</p>
      </Link>
    </footer>
  );
};

export default TheFooter;

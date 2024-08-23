"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import TheNavbar from "./TheNavbar";
import { useModal } from "./ModalProvider";

import { useAuth } from "@/hooks/useAuth";
import { removeUser } from "@/store/slices/userSlice";

import "react-toastify/dist/ReactToastify.css";

const TheHeader: React.FC = () => {
  const { onOpen, setType } = useModal();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const isActive = (href: string) => pathname === href;
  const handlePress = (type: "login" | "reg" | "exit") => {
    if (type === "login" || type === "reg") {
      setType(type);
      onOpen();
    } else {
      dispatch(removeUser());
    }
  };

  return (
    <>
      <TheNavbar
        handlePress={handlePress}
        isActive={isActive}
        isAuth={isAuth}
      />
      <ToastContainer />
    </>
  );
};

export default TheHeader;

"use client";
import React, { useCallback } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { signOut, getAuth } from "firebase/auth";

import TheNavbar from "./TheNavbar";
import { useModal } from "./ModalProvider";

import { useAuth } from "@/hooks/useAuth";
import { removeUser } from "@/store/slices/userSlice";

import "react-toastify/dist/ReactToastify.css";
import { useAuthStateListener } from "@/hooks/useAuthStateListener";

const TheHeader: React.FC = () => {
  useAuthStateListener();
  const { onOpen, setType } = useModal();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const auth = getAuth();
  const isActive = useCallback((href: string) => pathname === href, [pathname]);
  const handlePress = useCallback(
    (type: "login" | "reg" | "exit") => {
      if (type === "login" || type === "reg") {
        setType(type);
        onOpen();
      } else {
        signOut(auth)
          .then(() => {
            dispatch(removeUser());
          })
          .catch((error) => {
            console.error("Ошибка при выходе:", error);
          });
      }
    },
    [setType, onOpen, dispatch],
  );

  return (
    <>
      <TheNavbar
        handlePress={handlePress}
        isActive={isActive}
        isAuth={isAuth}
      />
    </>
  );
};

export default TheHeader;

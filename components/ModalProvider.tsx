"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";
import { useDisclosure } from "@nextui-org/react";

import AuthModal from "./AuthModal";

import { AuthProviderProps, TypeStrings } from "@/types/modalTypes";

const ModalContext = createContext<AuthProviderProps>({
  isOpen: false,
  onOpen: () => {},
  onOpenChange: () => {},
  type: "reg",
  setType: () => {},
});

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [type, setType] = useState<TypeStrings>("reg");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <ModalContext.Provider
      value={{ isOpen, onOpen, onOpenChange, type, setType }}
    >
      {children}
      <AuthModal isOpen={isOpen} type={type} onOpenChange={onOpenChange} />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModal должен использоваться внутри ModalProvider");
  }

  return context;
};

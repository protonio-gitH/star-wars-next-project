"use client";
import React, { memo } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

import { useModal } from "./ModalProvider";

import { siteConfig } from "@/config/site";

const TheNavbar: React.FC = () => {
  const { onOpen, setType } = useModal();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  const pressFunction = (type: "login" | "reg") => {
    setType(type);
    onOpen();
  };

  return (
    <Navbar>
      <NavbarBrand>
        <Link className="font-bold text-inherit" href="/">
          Star Wars
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden lg:flex gap-4 justify-start ml-2">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href} isActive={isActive(item.href)}>
            <Link
              color={isActive(item.href) ? "primary" : "foreground"}
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} onPress={() => pressFunction("login")}>
            Войти
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="#"
            variant="flat"
            onPress={() => pressFunction("reg")}
          >
            Зарегистрироваться
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default memo(TheNavbar);

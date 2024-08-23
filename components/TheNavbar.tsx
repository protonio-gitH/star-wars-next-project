import React, { memo } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

import { siteConfig } from "@/config/site";

interface NavbarProps {
  isActive: (href: string) => boolean;
  handlePress: (type: "login" | "reg" | "exit") => void;
  isAuth: boolean;
}

const TheNavbar: React.FC<NavbarProps> = ({
  isActive,
  handlePress,
  isAuth,
}) => {
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
      {!isAuth ? (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button as={Link} onPress={() => handlePress("login")}>
              Войти
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href="#"
              variant="flat"
              onPress={() => handlePress("reg")}
            >
              Зарегистрироваться
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button as={Link} onPress={() => handlePress("exit")}>
              Выйти
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
};

export default memo(TheNavbar);

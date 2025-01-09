"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Input,
  Button,
} from "@nextui-org/react";
import { ShoppingCart, UserCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width = 20,
  height = 20,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default function NavbarComp() {
  const [sessionAvailable, setSessionAvailable] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/get-session", {
          method: "GET",
        });
        const response = await res.json();
        if (response.error === false) {
          setSessionAvailable(true);
        } else {
          setSessionAvailable(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkSession();
  }, []);

  return (
    <Navbar isBordered shouldHideOnScroll>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link href={"/"} className="block font-bold text-2xl text-blue-500">
            @Discount CPUs
          </Link>
        </NavbarBrand>
        <NavbarContent className="gap-3">
          <Input
            classNames={{
              base: "w-40 sm:w-60 h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 text-blue-500",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={24} />}
          />
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Link href={"/cart"}>
          <ShoppingCart className="text-blue-500 hover:scale-105 transition-all" />
        </Link>
        {sessionAvailable ? (
          <Link href="/profile">
            <UserCircle className="text-blue-500 hover:scale-105 transition-all" />
          </Link>
        ) : (
          <Button as={Link} color="primary" href="/signin" variant="flat">
            Signin
          </Button>
        )}
      </NavbarContent>
    </Navbar>
  );
}

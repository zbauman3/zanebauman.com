"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinkItem = ({
  href,
  text,
  isActive,
}: {
  href: string;
  text: string;
  isActive: boolean;
}) => (
  <li>
    <Link
      href={href}
      className={`hover:bg-neutral-100 dark:hover:bg-neutral-800 py-4 px-4 block ${
        isActive ? "bg-neutral-100 dark:bg-neutral-800" : ""
      }`}
    >
      {text}
    </Link>
  </li>
);

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <>
      <nav className="flex flex-row flex-nowrap items-center justify-center top-0 left-0 w-screen bg-inherit border-b-[1px] border-b-solid border-b-neutral-200 dark:border-b-neutral-800 ">
        <ul className="flex flex-row flex-nowrap items-start justify-start space-x-2 overflow-hidden max-w-3xl w-full">
          <NavLinkItem href="/" text="Home" isActive={pathname === "/"} />
          <NavLinkItem
            href="/search"
            text="Search"
            isActive={pathname === "/search"}
          />
          <NavLinkItem
            href="/tags"
            text="Tags"
            isActive={pathname === "/tags"}
          />
        </ul>
      </nav>
    </>
  );
};

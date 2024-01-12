import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import BreadCrump from "../BreadCrump";
import Link from "next/link";

const Layout = ({ children, navItem }: { children: ReactNode; navItem?: { href: string; label: string }[] }) => {
  const router = useRouter();

  return (
    <div>
      <header className={`header ${navItem ? "" : "!border-b-0"}`}>
        {navItem?.map((item, index) => (
          <Link className={router.pathname === item.href ? "active_route" : ""} key={index} href={item.href}>
            {item.label}
          </Link>
        ))}
      </header>
        <BreadCrump />
      <main className="container mx-auto my-10 p-4">{children}</main>
    </div>
  );
};

export default Layout;

import React, { ReactNode } from "react";
import BreadCrump from "../BreadCrump";
import Link from "next/link";

const Layout = ({ children, navItem }: { children: ReactNode; navItem?: { href: string; label: string }[] }) => {
  return (
    <div>
      <header className={`header ${navItem ? "" : "!border-b-0"}`}>
        {navItem?.map((item, index) => (
          <Link key={index} href={item.href}>
            {item.label}
          </Link>
        ))}
      </header>
      <BreadCrump />
      <main className="container mx-auto  my-10 p-4">{children}</main>
    </div>
  );
};

export default Layout;

"use client"
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import BreadCrump from "../BreadCrump";
import Link from "next/link";

const Layout = ({ children, navItem ,disableBreadCrump}: { children: ReactNode; navItem?: { href: string; label: string }[] ,disableBreadCrump?:boolean }) => {
  const pathName = usePathname();

  return (
    <div>
      <header className={`header ${navItem ? "" : "!border-b-0"}`}>
        {navItem?.map((item, index) => (
          <Link prefetch={false} className={pathName === item.href ? "active_route" : ""} key={index} href={item.href}>
            {item.label}
          </Link>
        ))}
      </header>
        {disableBreadCrump ?null:<BreadCrump />}
      <main className="container mx-auto my-10 p-4">{children}</main>
    </div>
  );
};

export default Layout;

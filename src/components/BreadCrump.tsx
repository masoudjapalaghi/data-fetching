import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const BreadCrump = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter(Boolean);
  return (
    <div className="box m-4">
      {/* Breadcrumb navigation */}
      {pathSegments.map((segment, index) => (
        <React.Fragment key={index}>
          {index === 0 && (
            <span key="home">
              <Link
                href={`/`}
                className={router.asPath === "/" ? "active_link" : ""}
              >
                home {` / `}
              </Link>
            </span>
          )}
          <span key={segment}>
            <Link
              href={`/${pathSegments.slice(0, index + 1).join("/")}`}
              className={
                router.asPath ===
                `/${pathSegments.slice(0, index + 1).join("/")}`
                  ? "active_link"
                  : ""
              }
            >
              {segment}
            </Link>
            {index < pathSegments.length - 1 && " / "}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

export default BreadCrump;

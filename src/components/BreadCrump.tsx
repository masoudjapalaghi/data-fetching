import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const BreadCrump = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter(Boolean);
  return (
    <div className="flex flex-wrap items-center justify-between w-100">
      <div className="wrapper_breadCrump m-4">
        {/* Breadcrumb navigation */}
        {pathSegments.map((segment, index) => (
          <React.Fragment key={index}>
            {index === 0 && (
              <span key="home">
                <Link href={`/`} className={router.asPath === "/" ? "active_link" : ""}>
                  home {` / `}
                </Link>
              </span>
            )}
            <span key={segment}>
              <Link href={`/${pathSegments.slice(0, index + 1).join("/")}`} className={router.asPath === `/${pathSegments.slice(0, index + 1).join("/")}` ? "active_link" : ""}>
                {segment}
              </Link>
              {index < pathSegments.length - 1 && " / "}
            </span>
          </React.Fragment>
        ))}
      </div>
      {router.asPath == "/createProduct" ? (
        <div className="cursor-pointer text-teal-200 border-2 border-teal-200 p-2 rounded-md mr-4 transition-all hover:scale-110" onClick={() => router.back()}>
          Back
        </div>
      ) : (
        <Link className="cursor-pointer text-teal-200 border-2 border-teal-200 p-2 rounded-md mr-4 transition-all hover:scale-110" href={"/createProduct"}>
          CreateProduct
        </Link>
      )}
    </div>
  );
};

export default BreadCrump;

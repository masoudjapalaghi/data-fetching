import Link from "next/link";
import { usePathname,useRouter } from "next/navigation";
import React from "react";

const BreadCrump = () => {
  const pathName = usePathname();
  const router = useRouter()
  const pathSegments = pathName?pathName.split("/").filter(Boolean) :[""];
  return (
    <div className="flex flex-wrap items-center justify-between w-100">
      <div className="wrapper_breadCrump m-4">
        {/* Breadcrumb navigation */}
        {pathSegments.map((segment, index) => (
          <React.Fragment key={index}>
            {index === 0 && (
              <span key="home">
                <Link prefetch={false} href={`/`} className={pathName === "/" ? "active_link" : ""}>
                  home {` / `}
                </Link>
              </span>
            )}
            <span key={segment}>
              <Link prefetch={false} href={`/${pathSegments.slice(0, index + 1).join("/")}`} className={pathName === `/${pathSegments.slice(0, index + 1).join("/")}` ? "active_link" : ""}>
                {segment}
              </Link>
              {index < pathSegments.length - 1 && " / "}
            </span>
          </React.Fragment>
        ))}
      </div>
      {pathName == "/createProduct" ? (
        <div className="cursor-pointer text-teal-200 border-2 border-teal-200 p-2 rounded-md mr-4 transition-all hover:scale-110" onClick={() => router.back()}>
          Back
        </div>
      ) : (
        <Link prefetch={false} className="cursor-pointer text-teal-200 border-2 border-teal-200 p-2 rounded-md mr-4 transition-all hover:scale-110" href={"/createProduct"}>
          CreateProduct
        </Link>
      )}
    </div>
  );
};

export default BreadCrump;

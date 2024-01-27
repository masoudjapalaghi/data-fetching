"use client";

import { useRouter } from "next/navigation";

const ButtonRevalidate = ({ isTag }: { isTag?: boolean }) => {
  const { refresh } = useRouter();
  const baseRoute = isTag ? "revalidateTag" : "revalidatePath";
  const queryPropertyName = isTag ? "tag" : "path";
  const queryValue = isTag ? "revalidateTag" : "/appRoutes/Revalidating/OnDemandRevalidation/RevalidatePath";
  const handleRevalidate = () => {
    fetch(`/api/${baseRoute}?${queryPropertyName}=${queryValue}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => (res.revalidated ? refresh() : null));
  };
  return (
    <button onClick={handleRevalidate} className="cursor-pointer text-teal-200 border-2 border-teal-200 p-2 rounded-md mr-4 transition-all hover:scale-110">
      revalidate
    </button>
  );
};

export default ButtonRevalidate;

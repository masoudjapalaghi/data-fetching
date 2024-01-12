import Spinner from "@/components/Spinner";
import config from "@/helpers/config";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CreateProduct = () => {
  const router = useRouter();
  const [status, setStatus] = useState({
    loading: false,
    success: false,
  });
  const handleSubmit = (e: any) => {
    setStatus((prev) => ({ ...prev, loading: true }));
    e.preventDefault();
    const body = {
      title: e.target.title.value,
      price: e.target.price.value,
    };
    fetch(config.apiUrlClient + "lists/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.id) setStatus((prev) => ({ ...prev, loading: false, success: true }));
      })
      .catch((err) => setStatus((prev) => ({ ...prev, loading: false, success: false })));
  };

  useEffect(() => {
    if (status.success) {
      router.back();
    }
  }, [status]);

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          title
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="title" />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          price
        </label>
        <input
          className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="price"
          type="number"
          placeholder="$2000"
        />
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{status.loading ? <Spinner /> : "Sign In"}</button>
      </div>
    </form>
  );
};

export default CreateProduct;
// AddedProduct.getLayout = function getLayout(page: any) {
//     return <GetStaticPropsLayout>{page}</GetStaticPropsLayout>;
//   };

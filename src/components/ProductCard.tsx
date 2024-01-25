import { generateRandomPrice } from "@/helpers/Method";
import config from "@/helpers/config";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/router";

const ProductCard = ({
  data,
  href,
  isDetails,
  reloadAfterChange,
  refetch,
}: {
  data: ProductCardType;
  href?: string;
  isDetails?: boolean;
  reloadAfterChange?: boolean;
  refetch?: () => void;
}) => {
  const { replace, asPath, push } = useRouter();
  const AsLink = href ? Link : "div";
  const [status, setStatus] = useState({
    deleteLoading: false,
    updateLoading: false,
    deleteSuccess: false,
    updateSuccess: false,
  });
  const handleChangePrice = (id: String, e: any) => {
    setStatus((prev) => ({ ...prev, updateLoading: true }));
    e.stopPropagation();
    e.preventDefault();

    fetch(config.apiUrlClient + "lists/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "put",
      body: JSON.stringify({ price: generateRandomPrice() }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.id) {
          setStatus((prev) => ({ ...prev, updateLoading: false, updateSuccess: true }));
        }
      })
      .catch((err) => {
        setStatus((prev) => ({ ...prev, updateSuccess: true, updateLoading: false }));
      });
    // setStatus((prev) => ({ ...prev, updateLoading: false }));
  };
  const handleDeleteProduct = (id: String, e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setStatus((prev) => ({ ...prev, deleteLoading: true }));
    fetch(config.apiUrlClient + "lists/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "delete",
      body: JSON.stringify({ price: generateRandomPrice() }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.id) {
          setStatus((prev) => ({ ...prev, deleteLoading: false, deleteSuccess: true }));
        }
      })
      .catch((err) => {
        setStatus((prev) => ({ ...prev, deleteLoading: false, deleteSuccess: false }));
      });
    // setStatus((prev) => ({ ...prev, updateLoading: false }));
  };

  useEffect(() => {
    if (reloadAfterChange && (status.deleteSuccess || status.updateSuccess)) {
      if (refetch) {
        refetch?.();
      } else {
        push(asPath);
      }
      setStatus((prev) => ({ ...prev, deleteSuccess: false, updateSuccess: false }));
    }
  }, [status]);

  return (
    <div className={`${isDetails ? "" : "max-w-md"} w-full bg-gray-900 shadow-lg rounded-xl p-6`}>
      <div className="flex flex-col ">
        <div>
          <div className="relative  w-full mb-3">
            <div className="absolute flex flex-col top-0 right-0 p-3">
              <button className="transition ease-in duration-300 bg-gray-800  hover:text-purple-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
            <AsLink prefetch={false} href={href ?? "#"}>
              <Image src={data?.imageSrc} width={400} height={228} quality={100} alt="Just a flower" className=" w-full   object-fill  rounded-2xl" />
            </AsLink>
          </div>
          <div className="flex-auto justify-evenly">
            <div className="flex flex-wrap ">
              <div className="w-full flex-none text-sm flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-gray-400 whitespace-nowrap mr-3">4.60</span>
                <span className="mr-2 text-gray-400">India</span>
              </div>
              <div className="flex items-center w-full justify-between min-w-0 ">
                <h2 className="text-lg mr-auto cursor-pointer text-gray-200 hover:text-purple-500 truncate ">{data?.title}</h2>
                <div className="flex items-center bg-green-400 text-white text-xs px-2 py-1 ml-3 rounded-lg">INSTOCK</div>
              </div>
            </div>
            <div className="text-xl text-white font-semibold mt-1">${data?.price}.00</div>
            <div className="lg:flex  py-4  text-sm text-gray-600">
              <div className="flex-1 inline-flex items-center  mb-3">
                <div className="w-full flex-none text-sm flex items-center text-gray-600">
                  <ul className="flex flex-row justify-center items-center space-x-2">
                    <li>
                      <span className="block p-1 border-2 border-gray-900 hover:border-blue-600 rounded-full transition ease-in duration-300">
                        <a href="#blue" className="block w-3 h-3 bg-blue-600 rounded-full" />
                      </span>
                    </li>
                    <li>
                      <span className="block p-1 border-2 border-gray-900 hover:border-yellow-400 rounded-full transition ease-in duration-300">
                        <a href="#yellow" className="block w-3 h-3  bg-yellow-400 rounded-full" />
                      </span>
                    </li>
                    <li>
                      <span className="block p-1 border-2 border-gray-900 hover:border-red-500 rounded-full transition ease-in duration-300">
                        <a href="#red" className="block w-3 h-3  bg-red-500 rounded-full" />
                      </span>
                    </li>
                    <li>
                      <span className="block p-1 border-2 border-gray-900 hover:border-green-500 rounded-full transition ease-in duration-300">
                        <a href="#green" className="block w-3 h-3  bg-green-500 rounded-full" />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex-1 inline-flex items-center mb-3">
                <span className="text-secondary whitespace-nowrap mr-3">Size</span>
                <div className="cursor-pointer text-gray-400 ">
                  <span className="hover:text-purple-500 p-1 py-0">S</span>
                  <span className="hover:text-purple-500 p-1 py-0">M</span>
                  <span className="hover:text-purple-500 p-1 py-0">L</span>
                  <span className="hover:text-purple-500 p-1 py-0">XL</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 text-sm font-medium justify-start">
              <button className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 ">
                {status.updateLoading ? <Spinner /> : <span onClick={(e) => handleChangePrice?.(data?.id, e)}>change Price</span>}
              </button>
              <button
                onClick={(e) => handleDeleteProduct?.(data?.id, e)}
                className="transition  ease-in duration-300 flex justify-center items-center   hover:bg-gray-800 border hover:border-gray-500 border-gray-700 hover:text-white  hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-2"
              >
                {status.deleteLoading ? (
                  <Spinner />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg " className="flex" viewBox="0,0,256,256" width="16px" height="16px">
                    <g
                      fill="#fa5252"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth={1}
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit={10}
                      strokeDasharray=""
                      strokeDashoffset={0}
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                      style={{ mixBlendMode: "normal" }}
                    >
                      <g transform="scale(2,2)">
                        <path d="M49,1c-1.66,0 -3,1.34 -3,3c0,1.66 1.34,3 3,3h30c1.66,0 3,-1.34 3,-3c0,-1.66 -1.34,-3 -3,-3zM24,15c-7.17,0 -13,5.83 -13,13c0,7.17 5.83,13 13,13h77v63c0,9.37 -7.63,17 -17,17h-40c-9.37,0 -17,-7.63 -17,-17v-52c0,-1.66 -1.34,-3 -3,-3c-1.66,0 -3,1.34 -3,3v52c0,12.68 10.32,23 23,23h40c12.68,0 23,-10.32 23,-23v-63.35937c5.72,-1.36 10,-6.50062 10,-12.64062c0,-7.17 -5.83,-13 -13,-13zM24,21h80c3.86,0 7,3.14 7,7c0,3.86 -3.14,7 -7,7h-80c-3.86,0 -7,-3.14 -7,-7c0,-3.86 3.14,-7 7,-7zM50,55c-1.66,0 -3,1.34 -3,3v46c0,1.66 1.34,3 3,3c1.66,0 3,-1.34 3,-3v-46c0,-1.66 -1.34,-3 -3,-3zM78,55c-1.66,0 -3,1.34 -3,3v46c0,1.66 1.34,3 3,3c1.66,0 3,-1.34 3,-3v-46c0,-1.66 -1.34,-3 -3,-3z" />
                      </g>
                    </g>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

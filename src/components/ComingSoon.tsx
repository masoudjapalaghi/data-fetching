import React from "react";

const ComingSoon = () => {
  return (
    <section className="flex items-center flex-1 h-[calc(100vh_-_200px)]">
      <div className="flex flex-col w-full ">
        <h1 className="text-5xl font-extrabold text-center lg:text-7xl 2xl:text-8xl">
          <span className="text-transparent bg-gradient-to-br bg-clip-text from-teal-500 via-indigo-500 to-sky-500 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500">
            Coming
          </span>
          <span className="text-transparent bg-gradient-to-tr bg-clip-text from-blue-500 via-pink-500 to-red-500 dark:from-sky-300 dark:via-pink-300 dark:to-red-500">
            Soon
          </span>
        </h1>
      </div>
    </section>
  );
};

export default ComingSoon;

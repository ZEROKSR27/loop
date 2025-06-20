import Link from "next/link";
import React from "react";

const Hero = () => {
    return (
        <section className="relative" id="home">
            <div
                aria-hidden="true"
                className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-50 "
            >
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 "></div>
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 "></div>
            </div>
            <div>
                <div className="relative pt-36">
                    <div className="lg:w-2/3 text-center mx-auto ">
                        <h1 className="text-gray-900  font-bold text-5xl md:text-6xl xl:text-7xl">
                            Loop is where{" "}
                            <span className="text-primary ">
                                work happens, in sync.
                            </span>
                        </h1>
                        <p className="mt-8 text-gray-700 selection:bg-green-200 ">
                            Microsoft Loop is a collaborative workspace that
                            lets teams create, share, and work together on
                            projects seamlessly. It combines flexible pages with
                            reusable components that sync across different apps,
                            making it easy to stay organized and up-to-date.
                        </p>
                        <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6 ">
                            <Link
                                href="/dashboard"
                                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                            >
                                <span className="relative text-base font-semibold text-white">
                                    Get started
                                </span>
                            </Link>
                            <a
                                href="#"
                                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95   sm:w-max"
                            >
                                <span className="relative text-base font-semibold text-primary ">
                                    Learn more{" "}
                                </span>
                            </a>
                        </div>
                        <div className="hidden py-8 mt-16 border-y border-gray-100 sm:flex justify-between">
                            <div className="text-left ">
                                <h6 className="text-lg font-semibold text-gray-700 ">
                                    The lowest price
                                </h6>
                                <p className="mt-2 text-gray-500">
                                    Some text here
                                </p>
                            </div>
                            <div className="text-left">
                                <h6 className="text-lg font-semibold text-gray-700 ">
                                    The fastest on the market
                                </h6>
                                <p className="mt-2 text-gray-500">
                                    Some text here
                                </p>
                            </div>
                            <div className="text-left">
                                <h6 className="text-lg font-semibold text-gray-700 ">
                                    The most loved
                                </h6>
                                <p className="mt-2 text-gray-500">
                                    Some text here
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

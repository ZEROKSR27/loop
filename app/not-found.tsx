import Link from "next/link";
import React from "react";

export default function Not_found() {
    return (
        <div className="checkerboard text-center">
            <div className="h-1/2  text-black flex items-center justify-center">
                <h1 className="text-4xl">this page does not exist !</h1>
            </div>
            <div className="h-1/2  text-black flex items-center justify-center">
                <Link href={"/"} className="text-3xl">
                    Home
                </Link>
            </div>
        </div>
    );
}

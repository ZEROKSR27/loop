import { SignIn } from "@clerk/nextjs";
import React from "react";

const Page = () => {
    return (
        <div className="h-screen w-full flex justify-center relative items-center">
            <SignIn />
        </div>
    );
};

export default Page;

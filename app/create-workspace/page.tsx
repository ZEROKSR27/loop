import React from "react";
import CoverImage from "@/components/ui/cover-image";

import Createworkspace from "@/components/ui/Createworkspace";

export default function Page() {
    return (
        <div className=" py-28 px-10 md:px-36 lg:px-64 xl:px-96 ">
            <div className="shadow-2xl rounded-xl">
                <CoverImage />
                <Createworkspace />
            </div>
        </div>
    );
}

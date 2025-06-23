import React from "react";
import CoverImage from "@/components/ui/cover-image";
import CreateDocument from "@/components/ui/CreateDocument";

type params = {
    params: Promise<{ workspaceID: string }>;
};

export default async function page({ params }: params) {
    const { workspaceID } = await params;

    return <File workspaceID={workspaceID} />;
}

function File({ workspaceID }: { workspaceID: string }) {
    return (
        <div className=" py-28 px-10 md:px-36 lg:px-64 xl:px-96 ">
            <div className="shadow-2xl rounded-xl">
                <CoverImage />
                <CreateDocument workspaceID={workspaceID} />
            </div>
        </div>
    );
}

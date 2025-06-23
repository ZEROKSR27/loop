"use client";
import React, { useState } from "react";
import HelloUser from "./HelloUser";
import { Button } from "./button";
import { AlignLeft, LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WorkspaceList() {
    const [workSpaceList, setWorkSpaceList] = useState([]);

    return (
        <div className="my-10 p-10 md:px-24 lg:px-[10%] ">
            <div className="flex justify-between ">
                <HelloUser />
                <Button variant={"default"}>+</Button>
            </div>
            <div className="mt-10 flex justify-between">
                <div>
                    <h2 className="text-primary">Workspaces</h2>
                </div>
                <div className="flex gap-2">
                    <LayoutGrid /> <AlignLeft />
                </div>
            </div>

            {workSpaceList?.length === 0 ? (
                <div className="flex flex-col justify-center items-center my-10">
                    <Image
                        src="/workspace.png"
                        alt="workspace"
                        width={200}
                        height={200}
                    />

                    <h2>Create a new workspace</h2>

                    <Link href={"/workspaces/create-workspace"}>
                        <Button className="m-3">+ New Workspace</Button>
                    </Link>
                </div>
            ) : (
                <div>WorkSpaceList</div>
            )}
        </div>
    );
}

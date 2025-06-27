import { workspace } from "@/types/workspace";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function WSLI({ ws }: { ws: workspace }) {
    return (
        <Link href={`workspaces/${ws.id}`}>
            <figure className=" rounded-xl  border-[0.5px]  skew-x-4 hover:scale-105 transition-all duration-150">
                <Image
                    src={ws.coverImage}
                    width={400}
                    height={200}
                    className=" object-cover h-[170px] "
                    alt="cover image for workspace"
                />
                <figcaption className=" p-4 bg-gray-100">
                    <h2 className=" flex gap-2 truncate ">
                        {ws.workspaceName} {ws.emoji}
                    </h2>
                </figcaption>
            </figure>
        </Link>
    );
}

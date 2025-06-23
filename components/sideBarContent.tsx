"use client";

import { document } from "@/types/document";
import { EditIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import { Button } from "./ui/button";

const SideBarContentMine = ({ data }: { data: document[] }) => {
    const [INDEX, setINDEX] = useState(0);

    useEffect(() => {}, [data]);

    return (
        <div className="px-5">
            {data.map((doc: document, i: number) => (
                <div
                    key={i}
                    className={`flex  justify-between p-2 hover:bg-gray-200 rounded-lg cursor-pointer ${
                        INDEX === i ? "bg-white" : ""
                    }`}
                    onClick={() => {
                        setINDEX(i);
                    }}
                >
                    <div className="flex space-x-2">
                        <Image
                            src={"/loopdocument.svg"}
                            alt="loop doc"
                            width={20}
                            height={20}
                        />
                        <h2 className="flex space-x-2">
                            <span className="truncate">{doc.documentName}</span>
                            {doc.emoji}
                        </h2>
                    </div>
                    <div>
                        <EditIcon />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SideBarContentMine;

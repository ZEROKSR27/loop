"use client";

import { document } from "@/types/document";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Dropdown } from "./ui/Dropdown";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import loopdocImage from "@/public/loopdocument.svg";

// import { Button } from "./ui/button";

const SideBarContentMine = ({
    data,
    currentDoc,
    inputRef = undefined,
    setShowCD,
    workspaceID,
    copyToClipboard,
}: {
    data: document[];
    currentDoc: string;
    inputRef?: React.RefObject<HTMLInputElement | null>;
    setShowCD: (b: boolean) => void;
    workspaceID: string;
    copyToClipboard: (s: string) => void;
}) => {
    const { replace: navigateTo } = useRouter();

    return (
        <div className="px-5">
            {data.map((doc: document, i: number) => (
                <Link
                    href={`/workspaces/${doc.workspaceID}/${doc.id}`}
                    key={i}
                    className={`flex  justify-between p-2  rounded-lg cursor-pointer ${
                        currentDoc === doc.id
                            ? "bg-violet-300"
                            : "hover:bg-gray-200"
                    }`}
                    onClick={() => {
                        setShowCD(false);
                    }}
                >
                    <div className="flex space-x-2">
                        <Image
                            src={loopdocImage}
                            alt="loop doc"
                            width={20}
                            height={20}
                        />
                        <h2 className="flex space-x-2">
                            <span className="truncate">{doc.documentName}</span>
                            {doc.emoji}
                        </h2>
                    </div>
                    <div className="flex items-center">
                        <Dropdown
                            onRename={() => {
                                inputRef?.current?.focus();
                                toast.warning(
                                    "I didn't have time to create that functionality😅 please use the input field to rename a document😝",
                                    { duration: 7000 }
                                );
                            }}
                            onShare={() => {
                                copyToClipboard(
                                    `https://${
                                        process.env.NEXT_PUBLIC_MY_DOMAIN ||
                                        "localhost:3000"
                                    }/${workspaceID}/${currentDoc}`
                                );
                            }}
                            onDelete={async () => {
                                if (data.length === 1) {
                                    toast.error(
                                        "You cannot delete the last document in a workspace"
                                    );
                                    return;
                                }

                                const res = await fetch(
                                    `/api/workspaces/documents/`,
                                    {
                                        method: "DELETE",
                                        body: JSON.stringify({
                                            documentID: doc.id,
                                        }),
                                    }
                                );
                                navigateTo("./" + data.at(0)?.id);
                                if (res.ok) {
                                    toast.success(
                                        "Document deleted successfully"
                                    );
                                }
                                if (!res.ok) {
                                    toast.error("Failed to delete document");
                                }
                            }}
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SideBarContentMine;

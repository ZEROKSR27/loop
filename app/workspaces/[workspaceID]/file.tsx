"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link2 } from "lucide-react";
import Link from "next/link";
import OpenEditor from "./openEditor";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseClient";
import { document } from "@/types/document";
import { Button } from "@/components/ui/button";

interface params {
    workspaceID: string;
}
export default function File({ workspaceID }: params) {
    const [DocumentList, setDocumentList] = useState<document[]>();

    useEffect(() => {
        const q = query(
            collection(db, "documents"),
            where("workspaceID", "==", workspaceID)
        );

        // onSnapshot returns an unsubscribe function
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const newDocuments: document[] = [];
                snapshot.forEach((doc) => {
                    const newDoc: document = {
                        id: doc.id,
                        ...doc.data(),
                    } as document;
                    newDocuments.push(newDoc);
                });

                setDocumentList(newDocuments); // Update state once with the new array
            },
            (error) => {
                console.error("Error fetching documents:", error);
            }
        );

        // Cleanup function: unsubscribe from the listener when the component unmounts
        return () => {
            unsubscribe();
        };
    }, [workspaceID]); // Dependency array only includes workspaceID

    return (
        <section className="  h-screen">
            <div className=" h-[70%] ">
                <div className="w-4/5 m-auto mt-5 ">
                    <h2 className="text-center mx-auto my-10">
                        These are all the documents inside this workspace
                    </h2>

                    <Table className=" border-4  ">
                        <TableCaption>
                            <span>
                                Forgive me for this disaster. No design skills
                                were used in this loop clone project
                            </span>
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    doc name
                                </TableHead>

                                <TableHead className="text-right">
                                    <span className="mr-4">open</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {DocumentList?.map((doc) => (
                                <TableRow key={doc.id}>
                                    <TableCell className="font-medium">
                                        {doc.documentName}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Button>
                                            <Link
                                                href={`/workspaces/${workspaceID}/${doc.id}`}
                                            >
                                                Open
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className=" py-6 px-[10%] bg-gray-200">
                <h2 className="">
                    {" "}
                    And here ( before adding the &quot;generate template by
                    AI&quot; feature ), <br />I realized that there is no way to
                    navigate between pages(^人^).
                    <br /> so idk i&apos;ll just put all the routes below :)
                </h2>
            </div>
            <div className=" py-6 px-[10%] bg-gray-400">
                <ul className="flex flex-col space-y-5">
                    <li>
                        <Link href={"/"}>
                            <Link2 width={20} height={20} />{" "}
                            <span className="mr-3.5">/</span>{" "}
                            <span>(home)</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/workspaces"}>
                            <Link2 width={20} height={20} />{" "}
                            <span>/workspaces</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/workspaces/create-workspace"}>
                            <Link2 width={20} height={20} />{" "}
                            <span>/workspaces/create-workspace</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/workspaces/${workspaceID}/create-document`}
                        >
                            <Link2 width={20} height={20} />{" "}
                            <span>
                                /workspaces/:workspaceID/create-document
                            </span>
                        </Link>
                    </li>
                    <OpenEditor w={DocumentList} id={workspaceID} />
                </ul>
            </div>
        </section>
    );
}

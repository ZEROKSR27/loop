"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CoverImage from "@/components/ui/cover-image";
import CreateDocument from "@/components/ui/CreateDocument";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { db } from "@/lib/firebase/firebaseClient";
import { document } from "@/types/document";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

type params = { workspaceID: string; documentID: string };

export default function File({ workspaceID, documentID }: params) {
    console.log(documentID);

    //
    //
    //

    const [DocumentList, setDocumentList] = useState<document[]>([]);
    const [ShowCreateDoc, setShowCreateDoc] = useState(false);

    useEffect(() => {
        console.log("step 1: ", DocumentList);
        const documentList = () => {
            const q = query(
                collection(db, "documents"),
                where("workspaceID", "==", workspaceID)
            );

            console.log("step 2", DocumentList);

            console.log("step 3", DocumentList);

            onSnapshot(q, (index) => {
                index.forEach((doc) => {
                    const newDoc: document = doc.data() as document;

                    setDocumentList((prev) => [...prev, newDoc]);
                });
            });

            console.log("step 3", DocumentList);
        };

        documentList();
    }, [workspaceID, DocumentList]);

    return (
        <SidebarProvider>
            <AppSidebar
                data={DocumentList}
                setShowCreateDoc={setShowCreateDoc}
            />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Building Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className=" w-full h-full ">
                    {ShowCreateDoc ? (
                        <div className=" py-28 px-10 md:px-36 lg:px-64 xl:px-96 ">
                            <div className="shadow-2xl rounded-xl">
                                <CoverImage />
                                <CreateDocument
                                    cancel={{
                                        onClick: () => {
                                            setShowCreateDoc(false);
                                        },
                                        show: true,
                                    }}
                                    workspaceID={workspaceID}
                                />
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

"use client";
import React, { useEffect, useState } from "react";
import HelloUser from "./HelloUser";
import { Button } from "./button";
import { AlignLeft, LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import WSLI from "./worksapceListItem";
import { workspace } from "@/types/workspace";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseClient";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";

export default function WorkspaceList() {
    const { user } = useUser();
    const { orgId } = useAuth();

    const [workSpaceList, setWorkSpaceList] = useState<workspace[]>([]);

    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const orgIdentifier =
                    orgId ||
                    user?.primaryEmailAddress?.emailAddress ||
                    "unknown";

                const q = query(
                    collection(db, "workspaces"),
                    where("orgID", "==", orgIdentifier)
                );

                const querySnapshot = await getDocs(q);

                const result: workspace[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...(doc.data() as Omit<workspace, "id">),
                }));

                setWorkSpaceList(result);
            } catch (error) {
                console.error("خطأ في جلب الـ workspaces:", error);
                toast.error("failed to fetch workspaces");
            }
        };

        if (user) {
            fetchWorkspaces();
        }
    }, [orgId, user]);

    return (
        <div className="my-10 p-10 md:px-24 lg:px-[10%] ">
            <div className="flex justify-between ">
                <HelloUser />
                <Button variant={"default"} asChild>
                    <Link href={"/workspaces/create-workspace"}>+</Link>
                </Button>
            </div>
            <div className="mt-10 flex justify-between">
                <div>
                    <h2 className="text-primary">Workspaces</h2>
                </div>
                <div
                    className="flex gap-2"
                    onClick={() => {
                        toast.message(
                            "Ok I know this project design is the second stupidest thing you've ever seen in your life but come on?, I didn't even design it with Figma I just started development right away",
                            { duration: 18000, dismissible: true }
                        );
                    }}
                >
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
                <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {workSpaceList.map((ws) => (
                        <WSLI key={ws.id} ws={ws} />
                    ))}
                </div>
            )}
        </div>
    );
}

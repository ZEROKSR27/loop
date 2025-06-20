"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { Button } from "./button";
import { Loader2Icon, SmilePlus } from "lucide-react";
import { Input } from "./input";
import ColPic from "../shared/ColPic";
import { useStore } from "@/store/store";

import { useRouter } from "next/navigation";

const Createworkspace = () => {
    // variables
    const isOpened = useStore((state) => state.isOpened);
    const coverImage = useStore((state) => state.coverImageURL);
    const setOpen = useStore((state) => state.setIsOpened);
    const setIsOpened = useStore((state) => state.setIsOpened);
    // state
    const [workspaceName, setWorkspaceName] = useState("");
    const [emoji, setEmoji] = useState("");
    const [loading, setLoading] = useState(false);
    // useHook
    const { user } = useUser();
    const createdBy = user?.primaryEmailAddress?.emailAddress || "unknown";
    const { orgId } = useAuth();
    const { replace: navigateTO } = useRouter();
    // create workspace handeler
    const createWorkspace = async () => {
        try {
            setLoading(true);
            // ID = now

            //1. await send data to api
            const response = await fetch("/api/create-workspace", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    workspaceName,
                    emoji,
                    coverImage,
                    createdBy,
                    orgID: orgId ?? createdBy,
                }),
            });
            //2. await get respond
            const data = await response.json();
            if (response.ok) {
                navigateTO("/workspaces/" + "ran" + "/" + "randomstring");
            } else {
                throw new Error(data.error);
            }
        } catch (err) {
            console.error("Request failed", err);
            // do something like toast error
            //   const result = ({ success: false, error: "Network or server error" });
            console.log("from client 60 createworkspace");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-12">
            {/* emoji picker overlay */}
            <div
                onClick={() => {
                    setIsOpened(false);
                }}
                className={`inset-0 absolute bg-black/40 z-50 ${
                    isOpened ? "fixed" : "hidden"
                }`}
            >
                {/* emoji picker */}
                <ColPic setIsOpened={setIsOpened} setEmoji={setEmoji} />
            </div>
            <h2 className="font-medium text-xl">Create a new workspace</h2>
            <h2 className="mt-2 font-medium text-sm">
                This is a shared workspace where you can colaborate with your
                team. u can rename this later
            </h2>
            <div className="mt-8 flex items-center gap-2">
                <Button onClick={() => setOpen(true)} variant={"outline"}>
                    {emoji ? (
                        emoji
                    ) : (
                        <div>
                            <SmilePlus />
                        </div>
                    )}
                </Button>
                <Input
                    placeholder="Workspace name"
                    onChange={(e) => {
                        setWorkspaceName(e.target.value);
                    }}
                />
            </div>
            <div className="flex justify-end  gap-6 mt-7">
                <Button
                    disabled={!workspaceName?.length || loading}
                    onClick={async () => {
                        await createWorkspace();
                    }}
                >
                    Create{" "}
                    {loading && <Loader2Icon className=" animate-spin" />}
                </Button>
                <Button variant={"outline"}>Cancel</Button>
            </div>
        </div>
    );
};

export default Createworkspace;

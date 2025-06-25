"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { Loader2Icon, SmilePlus } from "lucide-react";
import { Input } from "./input";
import ColPic from "../shared/ColPic";
import { usePersistentStore, useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FullWorkspace, useFetchWorkspace } from "@/services/api/fetcher";

const Createworkspace = () => {
    // store state
    const isOpened = useStore((state) => state.isOpened);
    const coverImage = useStore((state) => state.selectedCover.url);
    const setIsOpened = useStore((state) => state.setIsOpened);
    const show = usePersistentStore((state) => state.isShowThisAgain);
    const DoNotShowAgain = usePersistentStore(
        (state) => state.DoNotShowThisAgain
    );
    // useHook
    const [Name, setName] = useState("");
    const [emoji, setEmoji] = useState("");
    const { user } = useUser();
    const createdBy = user?.primaryEmailAddress?.emailAddress || "unknown";
    const { orgId } = useAuth();
    const { replace: navigateTo } = useRouter();
    //
    const obj: FullWorkspace = {
        coverImage,
        createdBy,
        emoji,
        Name,
        orgID: orgId ?? createdBy,
    };

    //
    const {
        Loading,
        f: createWorkspace,
        Res,
    } = useFetchWorkspace({
        reqBody: obj,
        task: "createFullNewWorkspace",
    });

    useEffect(() => {
        const uuid = Res?.data?.uuid;
        if (uuid) {
            navigateTo("/workspaces/" + uuid + "/" + uuid);
        }
    }, [Res?.data?.uuid, navigateTo]);

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
                <ColPic
                    isOpened={isOpened}
                    setIsOpened={setIsOpened}
                    setEmoji={setEmoji}
                />
            </div>
            <h2 className="font-medium text-xl">Create a new workspace</h2>
            <h2 className="mt-2 font-medium text-sm">
                This is a shared workspace where you can colaborate with your
                team. u can rename this later
            </h2>
            <div className="mt-8 flex items-center gap-2">
                <Button onClick={() => setIsOpened(true)} variant={"outline"}>
                    {emoji ? (
                        emoji
                    ) : (
                        <div>
                            <SmilePlus />
                        </div>
                    )}
                </Button>
                <Input
                    placeholder={"workspace name"}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </div>
            <div className="flex justify-end  gap-4 mt-7">
                <Button
                    disabled={!Name?.length || Loading}
                    onClick={async () => {
                        if (coverImage == "/cover.png" && show) {
                            toast.message(
                                "Click on the coverImage to change it",

                                {
                                    action: {
                                        label: "Don't show this again",
                                        onClick: () => DoNotShowAgain(),
                                    },
                                }
                            );
                        }
                        await createWorkspace();
                        if (Res?.data?.uuid) {
                            toast.success("Workspace created successfully!");
                        }
                    }}
                >
                    {Loading ? "Loading" : "Create"}
                    {Loading && <Loader2Icon className=" animate-spin" />}
                </Button>
                <Button variant={"outline"}>Cancel</Button>
            </div>
        </div>
    );
};

export default Createworkspace;

"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { Loader2Icon, SmilePlus } from "lucide-react";
import { Input } from "./input";
import ColPic from "../shared/ColPic";
import { usePersistentStore, useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { OneDoc, useFetchWorkspace } from "@/services/api/fetcher";

export default function CreateDocument({
    workspaceID,
    cancel = { show: false, onClick: () => {} },
}: {
    workspaceID: string;
    cancel?: {
        show: boolean;
        onClick: () => void;
    };
}) {
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
    const { replace: navigateTo } = useRouter();
    //
    const obj: OneDoc = {
        Name,
        coverImage,
        emoji,
        createdBy,
        documentOutput: [],
        workspaceID,
    };

    const {
        Loading,
        f: createDoc,
        Res,
    } = useFetchWorkspace({
        task: "CreateOnlyOneDocument",
        reqBody: obj,
    });

    useEffect(() => {
        const uuid = Res?.data?.uuid;
        if (uuid) {
            navigateTo("./" + uuid);
        }
    }, [Res?.data?.uuid, navigateTo]);

    return (
        <div className="p-12">
            <ColPic
                isOpened={isOpened}
                setIsOpened={setIsOpened}
                setEmoji={setEmoji}
            />

            <h2 className="font-medium text-xl">Create a new Document</h2>
            <h2 className="mt-2 font-medium text-sm selection:bg-green-200">
                create a document inside the current workspace. can rename this
                doc later
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
                    placeholder={"document name"}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </div>
            <div className="flex justify-end  gap-6 mt-7">
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
                        await createDoc();
                        if (Res?.data?.uuid) {
                            toast("A new document has been created", {
                                description:
                                    "You can only create 5 docs per workspace",
                                action: {
                                    label: "Undo",
                                    onClick: () => console.log("Undo"),
                                },
                            });
                        }
                    }}
                >
                    {Loading ? "loading" : "Create"}{" "}
                    {Loading && <Loader2Icon className="animate-spin" />}
                </Button>
                <Button
                    variant={"outline"}
                    className={`${cancel.show ? "" : "hidden"}`}
                    onClick={cancel.onClick}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}

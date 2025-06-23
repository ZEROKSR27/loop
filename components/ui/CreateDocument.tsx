"use client";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { Button } from "./button";
import { Loader2Icon, SmilePlus } from "lucide-react";
import { Input } from "./input";
import ColPic from "../shared/ColPic";
import { useStore } from "@/store/store";
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
    const coverImage = useStore((state) => state.coverImageURL);
    const setOpen = useStore((state) => state.setIsOpened);
    const setIsOpened = useStore((state) => state.setIsOpened);
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

    //
    const onSuccess = () => {
        let existingRes;
        if (!!Res) {
            existingRes = Res;

            const uuid = existingRes.data?.uuid;

            navigateTo("/workspaces/" + workspaceID + "/" + uuid);
        }
    };

    const {
        Loading,
        f: createDoc,
        Res,
    } = useFetchWorkspace({
        onSuccess,
        task: "CreateOnlyOneDocument",
        reqBody: obj,
    });

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
            <h2 className="font-medium text-xl">Create a new Document</h2>
            <h2 className="mt-2 font-medium text-sm">
                create a document inside the workspace that has this id{" "}
                {workspaceID}. u can rename this later
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
                        await createDoc();
                        toast("A new document has been created", {
                            description:
                                "You can only create 5 docs per workspace",
                            action: {
                                label: "Undo",
                                onClick: () => console.log("Undo"),
                            },
                        });
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

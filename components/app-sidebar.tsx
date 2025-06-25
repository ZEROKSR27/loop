import React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
    SidebarTriggerMineClose,
} from "@/components/ui/sidebar";
import Logo from "./icons/Logo";
import { Button } from "./ui/button";
import SideBarContentMine from "./sideBarContent";
import { document } from "@/types/document";
import { toast } from "sonner";

type props = {
    data: document[];
    workspaceId: string;
    setShowCreateDoc: (e: boolean) => void;
    currentDoc: string;
    inputRef?: React.RefObject<HTMLInputElement | null>;
    copyToClipboard: (s: string) => void;
};

export function AppSidebar({
    data,
    setShowCreateDoc,
    currentDoc,
    inputRef = undefined,
    copyToClipboard,
    workspaceId,

    ...props
}: props) {
    // This is sample data.

    return (
        <Sidebar {...props}>
            <SidebarHeader className="bg-blue-50">
                <SidebarMenu key={"d"}>
                    <SidebarMenuItem className="flex  justify-between items-center p-2.5">
                        <Logo />

                        <span
                            className="animated-button"
                            onClick={() =>
                                copyToClipboard(
                                    `https://${
                                        process.env.NEXT_PUBLIC_MY_DOMAIN ||
                                        "localhost:3000"
                                    }/${workspaceId}/${currentDoc}`
                                )
                            }
                        >
                            <span className=" bg-prim">Share</span>
                            <span />
                        </span>
                    </SidebarMenuItem>
                    <hr />
                    <SidebarMenuItem className="flex justify-between items-center p-2.5">
                        <h3 className="text-primary">create workspace</h3>{" "}
                        <SidebarTriggerMineClose>
                            <SidebarTrigger />

                            <Button
                                className="translate-x-3"
                                onClick={() => {
                                    if (data.length >= 5) {
                                        toast.error(
                                            "You can only create 5 docs per workspace"
                                        );
                                        setShowCreateDoc(false);
                                        return;
                                    }
                                    setShowCreateDoc(true);
                                }}
                            >
                                +
                            </Button>
                        </SidebarTriggerMineClose>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="bg-blue-50">
                <SideBarContentMine
                    copyToClipboard={copyToClipboard}
                    workspaceID={workspaceId}
                    currentDoc={currentDoc}
                    setShowCD={setShowCreateDoc}
                    inputRef={inputRef}
                    data={data}
                />
            </SidebarContent>
            <SidebarFooter className="bg-blue-50">
                {typeof data !== "undefined" && (
                    <div className="w-full flex flex-col items-start mb-4">
                        <div className="bg-white w-full h-2 rounded-full">
                            <div
                                className="bg-blue-500 h-full rounded-full"
                                style={{
                                    width: `${Math.min(
                                        (data.length / 5) * 100,
                                        100
                                    )}%`,
                                    transition: "width 0.3s",
                                }}
                            ></div>
                        </div>
                        <p className="text-black text-sm mt-2">
                            {`${Math.min((data.length / 5) * 100, 100).toFixed(
                                0
                            )}% of workspace limit reached`}
                        </p>
                    </div>
                )}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}

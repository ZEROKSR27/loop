import React from "react";

import { SidebarOptInForm } from "@/components/sidebar-opt-in-form";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "./icons/Logo";
import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import SideBarContentMine from "./sideBarContent";
import { document } from "@/types/document";

type props = {
    data: document[];
    setShowCreateDoc: (e: boolean) => void;
};

export function AppSidebar({ data, setShowCreateDoc, ...props }: props) {
    // This is sample data.

    return (
        <Sidebar {...props}>
            <SidebarHeader className="bg-blue-50">
                <SidebarMenu key={"d"}>
                    <SidebarMenuItem className="flex justify-between items-center p-2.5">
                        <Logo /> <Bell className="size-5 text-gray-500" />
                    </SidebarMenuItem>
                    <hr />
                    <SidebarMenuItem className="flex justify-between items-center p-2.5">
                        <h3 className="text-primary">create workspace</h3>{" "}
                        <Button
                            onClick={() => {
                                setShowCreateDoc(true);
                            }}
                        >
                            +
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="bg-blue-50">
                <SideBarContentMine data={data} />
            </SidebarContent>
            <SidebarFooter className="bg-blue-50">
                <div className="p-1">
                    <SidebarOptInForm />
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}

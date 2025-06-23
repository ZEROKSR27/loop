"use client";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent } from "react";

export default function Page() {
    const del = async (e: ChangeEvent<HTMLInputElement>) =>
        fetch("/api/workspaces/documents", {
            method: "DELETE",
            body: JSON.stringify({
                documentID: e.currentTarget.value,
            }),
        });

    const hatter = async (e: ChangeEvent<HTMLInputElement>) => {
        fetch("/api/workspaces/documents", {
            method: "POST",
            body: JSON.stringify({
                documentNEW: e.currentTarget.value,
            }),
        });
    };

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="p-5  bg-gray-200">
                DELETE
                <Input onChange={del} placeholder="create doc" />
                POST
                <Input onChange={hatter} placeholder="delete doc" />
            </div>
        </div>
    );
}

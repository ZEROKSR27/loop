"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";

export default function HelloUser() {
    const { user } = useUser();
    console.log(user?.firstName);

    return (
        <h2 className=" font-bold text-2xl">
            Hello, {user?.firstName ?? user?.username ?? "User"}
        </h2>
    );
}

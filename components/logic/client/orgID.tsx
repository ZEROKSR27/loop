"use client";

import { useAuth } from "@clerk/nextjs";
import React from "react";

type props = {
    setOrgID: (
        orgID: string | null | undefined
    ) => React.Dispatch<React.SetStateAction<string | null | undefined>>;
};

export default function OrgID({ setOrgID }: props) {
    const { orgId } = useAuth();
    setOrgID(orgId);
}

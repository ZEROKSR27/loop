"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({ children, cur }: { cur: string; children: ReactNode }) {
    return (
        <LiveblocksProvider
            publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCK_PK as string}
        >
            <RoomProvider id={cur}>
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}

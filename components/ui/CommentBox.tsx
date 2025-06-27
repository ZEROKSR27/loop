"use client";

import { useThreads } from "@liveblocks/react/suspense";
import { Composer, Thread } from "@liveblocks/react-ui";

export default function CommentBox() {
    const { threads } = useThreads();

    return (
        <div className=" w-full h-full shadow-xl z-50">
            {threads.map((thread) => (
                <Thread key={thread.id} thread={thread} />
            ))}
            <Composer />
        </div>
    );
}

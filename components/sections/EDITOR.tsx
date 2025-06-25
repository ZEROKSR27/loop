"use client";
import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef } from "react";
// import Header from "@editorjs/header"; // مثال على أدوات

const EDITOR = () => {
    const editorRef = useRef<EditorJS | null>(null);

    useEffect(() => {
        const editor = new EditorJS({
            placeholder:
                "type anything, each line is a block that you can modify or change postion",
            minHeight: 300,
            holder: "editor",
            //   tools: {
            //     header: Header,
            //   },
        });

        editorRef.current = editor;

        return () => {
            editorRef.current?.destroy?.();
            editorRef.current = null;
        };
    }, []);

    return (
        <div className="p-4 ">
            <div id="editor" className=" h-full border p-3! " />
        </div>
    );
};

export default EDITOR;

// components/Editor/EditorClient.tsx

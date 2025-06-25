"use client";
import dynamic from "next/dynamic";
import React from "react";
import { Button } from "../ui/button";
const EmojiPicker = dynamic(
    () => {
        return import("emoji-picker-react");
    },
    { ssr: false }
);

type props = {
    className?: string;
    setEmoji:
        | React.Dispatch<React.SetStateAction<string>>
        | ((emoji: string) => void);
    setIsOpened: (bool: boolean) => void;
    isOpened: boolean;
};

const ColPic = ({ className = "", setEmoji, setIsOpened, isOpened }: props) => {
    return (
        <div
            className={`inset-0 absolute bg-black/40 z-50 ${
                isOpened ? "fixed" : "hidden"
            }`}
            onClick={() => {
                setIsOpened(false);
            }}
        >
            {/* emoji picker */}{" "}
            <div
                className={` absolute left-[5%] right-[5%] top-[10%] bottom-[10%]  sm:left-[20%] sm:right-[20%] ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex space-x-2 py-2">
                    <Button
                        onClick={() => {
                            setIsOpened(false);
                        }}
                        variant={"outline"}
                    >
                        {" "}
                        ok{" "}
                    </Button>
                    <Button
                        onClick={() => {
                            setEmoji("");
                            setIsOpened(false);
                        }}
                        variant={"outline"}
                    >
                        Unset
                    </Button>
                </div>
                <EmojiPicker
                    onEmojiClick={(e) => setEmoji(e.emoji)}
                    width={"100%"}
                    height={"100%"}
                    lazyLoadEmojis={true}
                    previewConfig={{ showPreview: false }}
                />
            </div>
        </div>
    );
};

export default ColPic;

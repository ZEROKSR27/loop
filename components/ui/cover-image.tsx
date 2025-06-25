"use client";
import Image from "next/image";
import { Button } from "./button";
import CoverPicker from "./Coverpicker";
import { useStore } from "@/store/store";

export default function CoverImage({
    rounded = true,
    big = false,
}: {
    rounded?: boolean;
    big?: boolean;
}) {
    const coverImgURL = useStore((state) => state.selectedCover.url);
    return (
        <CoverPicker>
            <div className="relative group">
                <Button
                    className="hidden group-hover:block absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    variant={"outline"}
                >
                    Change Cover
                </Button>

                <div className="group-hover:opacity-10">
                    <Image
                        src={coverImgURL}
                        alt="cover image"
                        width={400}
                        height={400}
                        className={`w-full ${big ? "h-[200px]" : "h-[150]"} ${
                            rounded && "rounded-t-xl"
                        } object-cover `}
                    />
                </div>
            </div>
        </CoverPicker>
    );
}

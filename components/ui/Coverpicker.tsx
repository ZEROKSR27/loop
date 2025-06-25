"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { coverOptions } from "../shared/coverOptions";
import Image from "next/image";
import { useStore } from "@/store/store";

type props = {
    children: React.ReactNode;
};
export default function CoverPicker({ children }: props) {
    const selectedCover = useStore((state) => state.selectedCover);
    const setSelectedCover = useStore((state) => state.setselectedCover);

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="sm:max-w-[425px] lg:max-w-[756px]">
                    <DialogHeader>
                        <DialogTitle>Update Cover</DialogTitle>
                        <div className="grid grid-cols-2 lg:grid-cols-3  mt-3  h-[400px] scroll overflow-y-scroll ">
                            {coverOptions.map((option, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setSelectedCover({
                                                url: option.imageUrl,
                                                v: 1,
                                            });
                                        }}
                                        className={`${
                                            selectedCover.url ===
                                                option.imageUrl &&
                                            selectedCover.v === 1
                                                ? "border-primary "
                                                : "border-transparent"
                                        } p-1 rounded-md border-2 `}
                                    >
                                        <Image
                                            src={option.imageUrl}
                                            alt="cover image"
                                            width={200}
                                            height={200}
                                            className=" object-cover h-[70px] rounded-md w-full "
                                        />
                                    </div>
                                );
                            })}
                            {coverOptions.map((option, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setSelectedCover({
                                                url: option.imageUrl,
                                                v: 2,
                                            });
                                        }}
                                        className={`${
                                            selectedCover.url ===
                                                option.imageUrl &&
                                            selectedCover.v === 2
                                                ? "border-primary "
                                                : "border-transparent"
                                        } p-1 rounded-md border-2 `}
                                    >
                                        <Image
                                            src={option.imageUrl}
                                            alt="cover image"
                                            width={200}
                                            height={200}
                                            className=" object-cover h-[70px] rounded-md w-full "
                                        />
                                    </div>
                                );
                            })}
                            {coverOptions.map((option, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setSelectedCover({
                                                url: option.imageUrl,
                                                v: 3,
                                            });
                                        }}
                                        className={`${
                                            selectedCover.url ===
                                                option.imageUrl &&
                                            selectedCover.v === 3
                                                ? "border-primary "
                                                : "border-transparent"
                                        } p-1 rounded-md border-2 `}
                                    >
                                        <Image
                                            src={option.imageUrl}
                                            alt="cover image"
                                            width={200}
                                            height={200}
                                            className=" object-cover h-[70px] rounded-md w-full "
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </DialogHeader>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSelectedCover({
                                        url: "/cover.png",
                                        v: 1,
                                    });
                                }}
                            >
                                default
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit">Update</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}

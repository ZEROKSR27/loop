"use client";
import Image from "next/image";
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

export default function CoverImageButForEditor({
    imgURl = "/cover.png",
    setImgURL,
}: {
    imgURl: string;
    setImgURL: (img: string) => void;
}) {
    return (
        <CoverPicker selectedCover={imgURl} setSelectedCover={setImgURL}>
            <div className="relative group">
                <Button
                    className="hidden group-hover:block absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    variant={"outline"}
                >
                    Change Cover
                </Button>

                <div className="group-hover:opacity-10">
                    <Image
                        src={imgURl}
                        alt="cover image"
                        width={400}
                        height={400}
                        className={"w-full h-[200px]  object-cover"}
                    />
                </div>
            </div>
        </CoverPicker>
    );
}

type props = {
    children: React.ReactNode;
    selectedCover: string;
    setSelectedCover: (imgURL: string) => void;
};

function CoverPicker({ children, selectedCover, setSelectedCover }: props) {
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
                                            setSelectedCover(option.imageUrl);
                                        }}
                                        className={`${
                                            selectedCover === option.imageUrl
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
                                    setSelectedCover("/cover.png");
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

"use client";
import { Button } from "@/components/ui/button";
import {
    DialogHeader,
    DialogFooter,
    DialogClose,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { document } from "@/types/document";
import { Link2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OpenEditor({
    w,
    id,
}: {
    w: document[] | undefined;
    id: string;
}) {
    const { push } = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const docId = e.target.value;

        push(`/workspaces/${id}/${docId}`);
    };

    return (
        <li>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <div>
                            <Link2 width={20} height={20} />{" "}
                            <span>
                                /workspaces/:workspaceID/:documentID <br />
                                (Editor)
                            </span>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>where ?</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                            How am I supposed to know which doument you want to
                            open بلا؟
                        </DialogDescription>

                        <select
                            onChange={handleChange}
                            className="px-3 py-2 rounded border border-gray-300"
                        >
                            <option value="">choose</option>
                            {w?.map((doc) => (
                                <option key={doc.id} value={doc.id}>
                                    {doc.documentName}
                                </option>
                            ))}
                        </select>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="submit">open</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </li>
    );
}

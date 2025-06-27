"use client";

// GenerateFromAI.tsx
import React, { useState } from "react";
import { Button } from "./ui/button";
import { LayoutGrid, LoaderPinwheel } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";

type Props = {
    onGenerate: (prompt: string) => void;
};

export default function GenerateFromAI({ onGenerate }: Props) {
    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        try {
            await onGenerate(prompt); // I also see 'await' has no effect on the type of this expression.ts(80007) here
            setOpen(false); // إغلاق الـ Dialog بعد النجاح
            setPrompt(""); // إعادة تعيين الحقل
        } catch (error) {
            console.error("Failed to generate AI content:", error);
            // يمكنك عرض Toast هنا لو أردت
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button className="flex gap-2" onClick={() => setOpen(true)}>
                <LayoutGrid className="h-4 w-4" />
                <span>Generate AI Template</span>
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="m-2">
                            Generate AI Template
                        </DialogTitle>
                        <DialogDescription className="mb-4">
                            <label className="block mb-1">
                                What topic do you want to generate a template
                                about?
                            </label>
                            <Input
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Ex. Marketing Plan for Our coffee shop"
                                disabled={loading}
                            />
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex items-center justify-end space-x-2">
                        <Button
                            variant={"outline"}
                            onClick={() => setOpen(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant={"destructive"}
                            onClick={handleGenerate}
                            disabled={!prompt.trim() || loading}
                        >
                            {loading ? (
                                <LoaderPinwheel className="animate-spin" />
                            ) : (
                                "Generate"
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

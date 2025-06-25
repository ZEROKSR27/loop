"use client";
import { useState, useRef, useEffect } from "react";
import { Link2, MoreVertical, PenBoxIcon, Trash2 } from "lucide-react";

interface DropdownProps {
    onRename: () => void;
    onDelete: () => void;
    onShare: () => void;
}

export const Dropdown = ({ onRename, onDelete, onShare }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className="p-1 hover:bg-gray-100 rounded"
            >
                <MoreVertical className="size-4" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-auto bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();

                            setIsOpen(false);
                            onShare?.();
                        }}
                        className="flex flex-nowrap items-center space-x-2 w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        <Link2 width={20} height={20} />{" "}
                        <span className=" text-nowrap">Share Document</span>
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();

                            setIsOpen(false);
                            onRename?.();
                        }}
                        className="flex flex-nowrap items-center space-x-2 w-full text-left  px-4 py-2 hover:bg-gray-100"
                    >
                        <PenBoxIcon width={20} height={20} />
                        <span> Rename</span>
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setIsOpen(false);
                            onDelete?.();
                        }}
                        className="flex flex-nowrap items-center space-x-2 w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                        <Trash2 width={20} height={20} /> <span>Delete</span>
                    </button>
                </div>
            )}
        </div>
    );
};

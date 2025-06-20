import { create } from "zustand";

type store = {
    coverImageURL: string;
    setCoverImageURL: (coverImageURL: string) => void;

    isOpened: boolean;
    setIsOpened: (isColPickOpened: boolean) => void;

    workspace: {
        name: string;
        emoji: string;
    };
    setWorkspace: (name: string, emoji: string) => void;
};

export const useStore = create<store>((set) => ({
    // coverImageURL
    coverImageURL: "/cover.png",
    setCoverImageURL: (url) => set({ coverImageURL: url }),
    // isOpened
    isOpened: false,
    setIsOpened: (bool: boolean) => set({ isOpened: bool }),
    // workspace
    workspace: {
        name: "",
        emoji: "",
    },
    setWorkspace: (name: string, emoji: string) =>
        set({ workspace: { name, emoji } }),
}));

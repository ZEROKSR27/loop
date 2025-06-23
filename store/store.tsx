import { workspace } from "@/types/workspace";
import { create } from "zustand";

type store = {
    coverImageURL: string;
    setCoverImageURL: (coverImageURL: string) => void;

    // i thoght this project would be small so I just put all states in this confusing store
    isOpened: boolean;
    setIsOpened: (isColPickOpened: boolean) => void;

    workspace: workspace;
    setWorkspace: (wor: workspace) => void;
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
        coverImage: "/cover.png",
        createdAt: "",
        createdBy: "",
        emoji: "",
        id: "",
        orgID: "",
        workspaceName: "",
    },
    setWorkspace: (wor: workspace) => set({ workspace: wor }),
}));

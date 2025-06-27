import { workspace } from "@/types/workspace";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type selectedCover = {
    url: "/cover.png" | string;
    v: 1 | 2 | 3;
};

type store = {
    selectedCover: selectedCover;
    setselectedCover: (selectedCover: selectedCover) => void;

    // i thoght this project would be small so I just put all states in this confusing store
    isOpened: boolean;
    setIsOpened: (isColPickOpened: boolean) => void;

    workspace: workspace;
    setWorkspace: (wor: workspace) => void;

    sideBarState: {
        currentINDEX: number;
        setCurrentINDEX: (index: number) => void;
    };
};
export const useStore = create<store>((set) => ({
    // selectedCover
    selectedCover: {
        url: "/cover.png",
        v: 1,
    },
    setselectedCover: (selectedCover: selectedCover) => set({ selectedCover }),
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

    // sideBarState
    sideBarState: {
        currentINDEX: 0,
        setCurrentINDEX: (index: number) =>
            set((state) => ({
                sideBarState: { ...state.sideBarState, currentINDEX: index },
            })),
    },
}));

type PersistentProps = {
    isShowThisAgain: boolean;
    DoNotShowThisAgain: () => void;
};

export const usePersistentStore = create<PersistentProps>()(
    // Relevant: نغلف الدالة بـ persist لتفعيل التخزين
    persist(
        (set) => ({
            isShowThisAgain: true,
            DoNotShowThisAgain: () => set({ isShowThisAgain: false }),
        }),
        {
            name: "persistent-store", // Relevant: اسم التخزين في localStorage
        }
    )
);
type PersistentPropsTwo = {
    commentIsShow: boolean;
    DoNotShowCommentAgain: () => void;
};

export const usePersistentStoreTwo = create<PersistentPropsTwo>()(
    // Relevant: نغلف الدالة بـ persist لتفعيل التخزين
    persist(
        (set) => ({
            commentIsShow: true,
            DoNotShowCommentAgain: () => set({ commentIsShow: false }),
        }),
        {
            name: "persistent-storeTwo", // Relevant: اسم التخزين في localStorage
        }
    )
);

"use client";
import { AppSidebar } from "@/components/app-sidebar";
import ColPic from "@/components/shared/ColPic";

import CoverImage from "@/components/ui/cover-image";
import CoverImageButForEditor from "@/components/ui/cover-image-but-for-editor";
import CreateDocument from "@/components/ui/CreateDocument";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { db } from "@/lib/firebase/firebaseClient";
import { usePersistentStoreTwo, useStore } from "@/store/store";
import { document } from "@/types/document";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import {
    collection,
    doc,
    onSnapshot,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import {
    MessageCircleDashedIcon,
    MessageCircleOffIcon,
    SmilePlus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import CommentBox from "@/components/ui/CommentBox";
import { Room } from "@/app/Room";
import StupidLoader from "@/components/shared/stupidLoader";

const EditorClient = dynamic(() => import("@/components/sections/EDITOR"), {
    ssr: false,
    loading: () => <StupidLoader />,
});

type params = { workspaceID: string; documentID: string };

export default function File({ workspaceID, documentID }: params) {
    const DoNotShowComAgain = usePersistentStoreTwo(
        (state) => state.DoNotShowCommentAgain
    );
    const commentIsShowAgain = usePersistentStoreTwo(
        (state) => state.commentIsShow
    );

    const [DocumentList, setDocumentList] = useState<document[]>([]);
    const [ShowCreateDoc, setShowCreateDoc] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    // states for the colPick
    const setIsOpened = useStore((state) => state.setIsOpened);

    const isOpened = useStore((state) => state.isOpened);

    const [isShowComment, setIsShowComment] = useState(false);

    const currentDocument = DocumentList.find((doc) => doc.id === documentID);
    console.log(
        "i am currentDoc.coverimg the one that should be pased to ",
        `URL:${currentDocument?.coverImage}`
    );

    const [emoji, setEmoji] = useState(currentDocument?.emoji || "");
    const setEmojiFuLL = (emoji: string) => {
        setEmoji(emoji);

        const docRef = doc(db, "documents", documentID);
        updateDoc(docRef, {
            ...currentDocument,
            emoji: emoji,
        });
    };
    const [COVERIMAGE, setCOVERIMAGE] = useState(
        currentDocument?.coverImage || "/cover.png"
    );
    const setCOVERIMAGEFuLL = (coverImageParam: string) => {
        setCOVERIMAGE(coverImageParam);

        const docRef = doc(db, "documents", documentID);
        updateDoc(docRef, {
            ...currentDocument,
            coverImage: coverImageParam,
        });
    };

    useEffect(() => {
        setCOVERIMAGE(currentDocument?.coverImage as string);
        setEmoji(currentDocument?.emoji as string);
    }, [currentDocument]);

    useEffect(() => {
        const q = query(
            collection(db, "documents"),
            where("workspaceID", "==", workspaceID)
        );

        // onSnapshot returns an unsubscribe function
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const newDocuments: document[] = [];
                snapshot.forEach((doc) => {
                    const newDoc: document = {
                        id: doc.id,
                        ...doc.data(),
                    } as document;
                    newDocuments.push(newDoc);
                });

                setDocumentList(newDocuments); // Update state once with the new array
            },
            (error) => {
                console.error("Error fetching documents:", error);
            }
        );

        // Cleanup function: unsubscribe from the listener when the component unmounts
        return () => {
            unsubscribe();
        };
    }, [workspaceID]); // Dependency array only includes workspaceID

    useEffect(() => {
        if (DocumentList.length === 5) {
            setShowCreateDoc(false);
        }
    }, [DocumentList]);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("file URL copied");
        } catch (err) {
            toast.error("Failed to copy");
            console.error(err);
        }
    };

    if (!currentDocument) return <StupidLoader />;

    return (
        <Room cur={currentDocument.id}>
            <SidebarProvider>
                <AppSidebar
                    copyToClipboard={copyToClipboard}
                    inputRef={inputRef}
                    currentDoc={documentID}
                    workspaceId={workspaceID}
                    data={DocumentList}
                    setShowCreateDoc={setShowCreateDoc}
                />
                <SidebarInset>
                    {/* header */}
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 ">
                        <SidebarTrigger className="-ml-1 " />

                        <div className=" flex flex-1 items-center justify-end  gap-2">
                            <button
                                className="animated-button hidden sm:block"
                                onClick={() =>
                                    copyToClipboard(
                                        `https://${
                                            process.env.NEXT_PUBLIC_MY_DOMAIN ||
                                            "localhost:3000"
                                        }/${workspaceID}/${currentDocument}`
                                    )
                                }
                            >
                                <span className=" bg-prim">Share</span>
                                <span />
                            </button>
                            <Separator
                                orientation="vertical"
                                className="data-[orientation=vertical]:h-5 hidden sm:block mx-2"
                            />
                            <UserButton />
                            <Separator
                                orientation="vertical"
                                className="data-[orientation=vertical]:h-5 mx-2"
                            />
                            <OrganizationSwitcher />
                        </div>
                    </header>
                    {/* body */}
                    <div className="w-full h-full ">
                        {ShowCreateDoc ? (
                            <div className=" py-28 px-10 md:px-36 lg:px-64 xl:px-96 ">
                                <div className="shadow-2xl rounded-xl">
                                    <CoverImage />
                                    <CreateDocument
                                        cancel={{
                                            onClick: () => {
                                                setShowCreateDoc(false);
                                            },
                                            show: true,
                                        }}
                                        workspaceID={workspaceID}
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Image  */}
                                <div className=" relative">
                                    <CoverImageButForEditor
                                        imgURl={COVERIMAGE}
                                        setImgURL={setCOVERIMAGEFuLL}
                                    />
                                    <div
                                        onClick={() => {
                                            setIsOpened(true);
                                        }}
                                        className="p-4 absolute translate-x-10 -translate-y-10  cursor-pointer bg-[#ffffffb0] size-fit rounded-md"
                                    >
                                        <span>
                                            {emoji ? (
                                                <span className="text-[30px]">
                                                    {emoji}
                                                </span>
                                            ) : (
                                                <SmilePlus
                                                    width={40}
                                                    height={40}
                                                />
                                            )}
                                        </span>
                                    </div>
                                </div>
                                {/* doc title */}

                                <div>
                                    <input
                                        type="text"
                                        ref={inputRef}
                                        className="outline-none my-10 w-full px-4 text-center text-violet-800 selection:bg-green-200 text-4xl font-semibold "
                                        value={
                                            currentDocument?.documentName || ""
                                        }
                                        onChange={async (e) => {
                                            const value = e.target.value;
                                            const docRef = doc(
                                                db,
                                                "documents",
                                                documentID
                                            );
                                            updateDoc(docRef, {
                                                ...currentDocument,
                                                documentName: value,
                                            });
                                        }}
                                        onBlur={async (e) => {
                                            if (!e.target.value) {
                                                const docRef = doc(
                                                    db,
                                                    "documents",
                                                    documentID
                                                );

                                                updateDoc(docRef, {
                                                    ...currentDocument,
                                                    documentName:
                                                        "Untitled Document",
                                                });
                                            }
                                        }}
                                    />
                                </div>
                                {/* comment */}
                                <div className="flex justify-center flex-col items-end min-h-20 h-fit px-3">
                                    <div className="felx space-x-2">
                                        <button
                                            onClick={() => {
                                                setIsShowComment(
                                                    (Prev) => !Prev
                                                );
                                                if (commentIsShowAgain) {
                                                    toast.message(
                                                        "Useing the comment button, Anyone with shared access to a document can chat online together, ...yes...I...Know... it's Weird that every one is Anonymous but for 3rd time I don't have time to Implement same features again and again... I don't even have to time to correct my English",
                                                        {
                                                            action: {
                                                                label: "Don't show this again",
                                                                onClick: (
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    DoNotShowComAgain();
                                                                },
                                                            },
                                                        }
                                                    );
                                                }
                                            }}
                                            className="animated-button text-black border-2 hover:text-purple-300 p-2 mb-5 h-fit"
                                        >
                                            <div className=" flex items-center">
                                                {isShowComment ? (
                                                    <MessageCircleDashedIcon />
                                                ) : (
                                                    <MessageCircleOffIcon />
                                                )}
                                                <p className="ml-2">Comments</p>
                                            </div>
                                        </button>
                                    </div>

                                    {isShowComment && <CommentBox />}
                                </div>

                                {/* finally the editor ! */}

                                <EditorClient cur={currentDocument?.id} />

                                {/* this colpick is absolute so it won't affect the layout */}
                                <ColPic
                                    setEmoji={setEmojiFuLL}
                                    setIsOpened={setIsOpened}
                                    isOpened={isOpened}
                                />
                                {/* this one too */}
                            </>
                        )}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </Room>
    );
}

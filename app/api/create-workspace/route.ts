import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { workspaceName, emoji, coverImage, createdBy, orgID } = body;
        // const docID = Date.now().toString();

        await db.collection("workspaces").add({
            workspaceName,
            emoji,
            coverImage,
            createdBy,
            orgID,
            createdAt: Date.now().toString(),
        });

        // const workspaceId = workspaceRef.id;

        // const documentRef = db.collection("documents").doc();
        // await documentRef.set({
        //     title: documentTitle,
        //     workspaceId,
        //     createdAt: new Date(),
        // });

        // const outputRef = db.collection("outputs").doc(documentRef.id);
        // await outputRef.set({
        //     text: outputContent,
        //     createdAt: new Date(),
        // });

        return NextResponse.json({
            message: "Workspace created successfully",
            success: true,
            status: 201,
        });
    } catch (err) {
        console.error(err);
        console.log("from server 50 ");

        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}

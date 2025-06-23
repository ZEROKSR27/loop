/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase/firebase-admin";

export async function POST(req: NextRequest) {
    try {
        //1. Get data from body
        const body = await req.json();
        const { workspaceName, emoji, coverImage, createdBy, orgID } = body;
        const uuid = Date.now().toString();

        //2. Insert it (data) to db
        //2.1 create workspace
        //2.2.1 only the IDs for generated (doc/output) must be the same but I'm too lazy to generate more IDs
        //2.2.2 create initial doc
        //2.3 create initial output
        await db.collection("workspaces").doc(uuid).set({
            workspaceName,
            emoji,
            coverImage,
            createdBy,
            orgID,
            createdAt: Date.now().toString(),
        });

        await db.collection("documents").doc(uuid).set({
            documentName: "Initial Document",
            createdBy,
            emoji,
            coverImage,
            workspaceID: uuid,
            documentOutput: [],
            id: uuid,
        });

        await db.collection("outputs").doc(uuid).set({
            documentID: uuid,
            workspaceID: uuid,
            output: [],
            id: uuid,
        });

        //3. return status created successfully
        return NextResponse.json({
            message: "Workspace created successfully",
            data: { uuid: uuid },
            success: true,
            status: 201,
        });
    } catch (err) {
        console.error("Error cathced in api/create-workspace/route.ts", err);
        return NextResponse.json(
            {
                error: "Internal error",
                message: "Workspace was not created",
                success: false,
                status: 500,
            },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const workspaceID = req.nextUrl.searchParams.get("workspaceID");
        const documentID = req.nextUrl.searchParams.get("documentID");

        if (!workspaceID || !documentID) {
            return NextResponse.json(
                {
                    error: "Bad Request",
                    message: "'workspaceID' & 'documentID' are both required",
                },
                { status: 400 }
            );
        }

        const querySnapshot = await db
            .collection("documents")
            .where("workspaceID", "==", workspaceID)
            .get();

        const documents: any[] = [];
        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
        });

        return NextResponse.json({
            message: "documents fetched successfully",
            success: true,
            status: 200,
            data: documents,
        });
    } catch (err) {
        console.error("Error caught in api/workspaces/route.ts GET", err);
        return NextResponse.json(
            {
                error: "Internal Server Error",
                message: "Failed to fetch workspaces",
                success: false,
                status: 500,
            },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const workspaceID = req.nextUrl.searchParams.get("workspaceID");

        if (!workspaceID) {
            return NextResponse.json(
                {
                    error: "Bad Request",
                    message: "'workspaceID' is required",
                },
                { status: 400 }
            );
        }

        const body = await req.json();
        const { workspaceName, emoji, coverImage } = body;

        const updateData: { [key: string]: any } = {};
        if (workspaceName) updateData.workspaceName = workspaceName;
        if (emoji) updateData.emoji = emoji;
        if (coverImage) updateData.coverImage = coverImage;

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json(
                {
                    error: "Bad Request",
                    message: "No fields provided for update",
                },
                { status: 400 }
            );
        }

        await db.collection("workspaces").doc(workspaceID).update(updateData);

        return NextResponse.json({
            message: "Workspace updated successfully",
            success: true,
            status: 200,
        });
    } catch (err) {
        console.error("Error caught in api/workspaces/route.ts PUT", err);
        return NextResponse.json(
            {
                error: "Internal Server Error",
                message: "Failed to update workspace",
                success: false,
                status: 500,
            },
            { status: 500 }
        );
    }
}

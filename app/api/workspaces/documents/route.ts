import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase/firebase-admin";
import { document } from "@/types/document";

export async function POST(req: NextRequest) {
    console.clear();
    console.log("start POST CONTROLLER from here");

    try {
        //1. get data from body
        const body: document = await req.json();
        const values = Object.values(body);
        const {
            coverImage,
            createdBy,
            documentName,
            documentOutput,
            emoji,
            workspaceID,
        } = body;

        //2. make sure data is there
        if (values.find((i) => !i) === undefined) {
            return NextResponse.json(
                {
                    error: "Bad Request",
                    message: "document information is not compelete",
                },
                { status: 400 }
            );
        }

        //3. add data to db
        const uuid = Date.now().toString();
        await db.collection("documents").doc(uuid).set({
            documentName,
            createdBy,
            emoji,
            coverImage,
            workspaceID,
            documentOutput,
            id: uuid,
        });

        //4. tel client about it
        return NextResponse.json({
            message: "document created successfully",
            data: {
                uuid: uuid,
            },
            success: true,
            status: 201,
        });
    } catch (err) {
        console.error(
            "Error caught in api/workspaces/documents/route.ts DELETE",
            err
        );
        return NextResponse.json(
            {
                error: "Internal Server Error",
                message: "Failed to delete workspace",
                success: false,
                status: 500,
            },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    console.clear();
    console.log("start GET CONTROLLER from here");

    try {
        //1. know what docs is client trying to get
        const workspaceID = req.nextUrl.searchParams.get("workspaceID");

        if (!workspaceID) {
            return NextResponse.json({
                error: "Bad Recuest , 400",
                message: "'workspaceID' is required",
            });
        }

        //2. just get them
        const fetchedDocuments = await db
            .collection("documents")
            .where("workspaceID", "==", workspaceID)
            .get()
            .then((qs) => qs.docs.map((doc) => doc.data()));

        //3. repond with them
        return NextResponse.json({
            message: "document feched successfully",
            data: fetchedDocuments,
            status: "200",
            success: true,
        });
    } catch (err) {
        console.error(
            "Error caught in api/workspaces/documents/route.ts DELETE",
            err
        );
        NextResponse.json(
            {
                error: "Server Error",
                success: false,
                status: 500,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    console.clear();
    console.log("start DELETE CONTROLLER from here");

    try {
        //1. get data from body
        const body = await req.json();
        const { documentID } = body;
        console.log(documentID);

        //2. make sure data is there
        if (!documentID) {
            return NextResponse.json(
                {
                    error: "Bad Request",
                    message: "'document' is required",
                },
                { status: 400 }
            );
        }

        //3. delete that document
        await db.collection("documents").doc(documentID).delete();

        //4. tel client about it
        return NextResponse.json({
            message: "document deleted successfully",
            success: true,
            status: 200,
        });
    } catch (err) {
        console.error(
            "Error caught in api/workspaces/documents/route.ts DELETE",
            err
        );
        return NextResponse.json(
            {
                error: "Internal Server Error",
                message: "Failed to delete workspace",
                success: false,
                status: 500,
            },
            { status: 500 }
        );
    }
}

// export async function POST(req: NextRequest) {
//     try {
//         console.clear();
//         const body = await req.json();
//         const { documentNEW } = body;
//         if (!documentNEW) {
//             NextResponse.json({ message: "documentNEW is required" });
//         }

//         await db.collection("workspaces").doc(Date.now().toString()).set({
//             workspaceName: documentNEW,
//             emoji: documentNEW,
//             coverImage: documentNEW,
//             createdBy: documentNEW,
//             orgID: documentNEW,
//             createdAt: Date.now().toString(),
//         });

//         NextResponse.json({
//             status: "ok",
//         });
//     } catch (err) {
//         console.error(err);
//         NextResponse.json({
//             status: 500,
//         });
//     }
// }

// 1. YOU send the error (if it exist) (just use the name of error)
// 2. YOU send a message explaining why was it !ok or just that it's ok
// 3. YOU send status/success if would be helpfull

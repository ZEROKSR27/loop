import { useState } from "react";
import { toast } from "sonner";

export interface FullWorkspace {
    Name: string;
    emoji: string;
    coverImage: string;
    createdBy: string;
    orgID: string;
}
export type OneDoc = {
    Name: string;
    emoji: string;
    coverImage: string;
    createdBy: string;
    workspaceID: string;
    documentOutput: [];
};
interface Res {
    error?: string;
    message: string;
    data?: {
        uuid: string;
    };
    success?: boolean;
    status?: number;
}
type props =
    | {
          task: "createFullNewWorkspace";
          reqBody: FullWorkspace;
          onSuccess?: () => void;
      }
    | {
          task: "CreateOnlyOneDocument";
          reqBody: OneDoc;
          onSuccess?: () => void;
      };

export const useFetchWorkspace = ({ task, reqBody, onSuccess }: props) => {
    const [Loading, setLoading] = useState(false);
    const [Res, setRes] = useState<Res | null>();

    const endpoint =
        task === "createFullNewWorkspace"
            ? "/api/workspaces"
            : "/api/workspaces/documents";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:
            task === "createFullNewWorkspace"
                ? JSON.stringify({
                      workspaceName: reqBody.Name,
                      emoji: reqBody.emoji,
                      coverImage: reqBody.coverImage,
                      createdBy: reqBody.createdBy,
                      orgID: reqBody.orgID,
                  })
                : JSON.stringify({
                      documentName: reqBody.Name,
                      createdBy: reqBody.createdBy,
                      emoji: reqBody.emoji,
                      coverImage: reqBody.coverImage,
                      workspaceID: reqBody.workspaceID,
                      documentOutput: reqBody.documentOutput,
                  }),
    };

    const f = async () => {
        try {
            setLoading(true);
            //1. await send data to api
            const response = await fetch(endpoint, options);

            //2. await get respond
            // setData(await response.json())
            setRes(await response.json());
            if (!response.ok) {
                throw new Error(Res?.error);
            }
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            console.error(
                "Request failed | catched in createWorkspace.tsx",
                err
            );
            toast("Error");
        } finally {
            setLoading(false);
        }
    };

    return { f, Loading, Res };
};

//workspaces/                                                 | not-found
//workspaces/create-workspace/                                | create workspace
//workspaces/12356(:workspaceID)/create-document/             | create doc
//workspaces/12356(:workspaceID)/123456(:documentID)/         | editor

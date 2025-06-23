import File from "./file";

type params = {
    params: Promise<{ workspaceID: string; documentID: string }>;
};

export default async function page({ params }: params) {
    const { documentID, workspaceID } = await params;

    return <File documentID={documentID} workspaceID={workspaceID} />;
}

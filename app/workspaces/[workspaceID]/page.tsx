import File from "./file";

interface params {
    params: Promise<{ workspaceID: string }>;
}
export default async function Page({ params }: params) {
    const { workspaceID } = await params;

    return <File workspaceID={workspaceID} />;
}

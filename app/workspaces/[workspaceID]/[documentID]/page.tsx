type props = {
    params: Promise<{ workspaceID: string; documentID: string }>;
};

export default async function Page({ params }: props) {
    const { workspaceID, documentID } = await params;
    return (
        <div>
            <div>
                <h1>Workspace: {workspaceID}</h1>
            </div>
            <div>
                <h1>Document: {documentID}</h1>
            </div>
        </div>
    );
}

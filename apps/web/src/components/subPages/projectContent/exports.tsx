import ExportsBlock from "./exportsBlock";

export default function Exports({ linkedExports, setLinkedExports }: { linkedExports: any[], setLinkedExports: (recordings: any[]) => void }) {
    return (
        <div className="h-full w-full">
            {linkedExports.length > 0 ? <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
                    {linkedExports.map((linkedExport, idx) => (
                        <ExportsBlock key={idx} linkedExport={linkedExport} />))}
                </div>
            </div> : <div className="flex flex-col items-center h-full">
                <div className="text-[16px] font-medium">No exports yet</div>
                <div className="text-[16px] text-[#9e9e9e] mt-[24px]">Your exported files will appear here.</div>
            </div>}
        </div>
    )
}
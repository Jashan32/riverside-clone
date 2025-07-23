export default function Exports({ linkedExports, setLinkedExports }: { linkedExports: any[], setLinkedExports: (recordings: any[]) => void }) {
    return (
        <div className="h-full w-full">
            {linkedExports.length > 0 ? <div>

            </div> : <div className="flex flex-col items-center h-full">
                <div className="text-[16px] font-medium">No exports yet</div>
                <div className="text-[16px] text-[#9e9e9e] mt-[24px]">Your exported files will appear here.</div>
            </div>}
        </div>
    )
}
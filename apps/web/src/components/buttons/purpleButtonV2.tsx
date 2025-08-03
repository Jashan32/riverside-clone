export default function PurpleButtonV2({ text, onClickFunction }: { text: string; onClickFunction: () => void }) {
    return (
        <button className="py-[10px] px-[16px] text-[14px] rounded-[10px] bg-[#7848ff] hover:bg-[#5a3cbc] cursor-pointer"
        onClick={onClickFunction}>
            {text}
        </button>
    )
}
export default function PurpleButton({text, onClickFunction}: {text: string, onClickFunction?: () => void}) {
    return (
        <button className=" cursor-pointer text-[14px] font-semibold bg-[#9671ff] hover:bg-[#a68ef8] py-[8px] px-[12px] rounded-[10px] whitespace-nowrap"
        onClick={onClickFunction}>
            {text}
        </button>
    )
}
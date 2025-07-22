export default function GenericButton({ text, type, onClickFunction, bgColor, textColor, hoverBg }: { text: string, type: "small" | "medium" | "large", onClickFunction: () => void, bgColor?: string, textColor?: string, hoverBg?: string }) {
    return (
        <div className={`${bgColor} ${textColor} ${hoverBg} cursor-pointer py-[10px] px-[16px] flex -tems-center justify-center rounded-[10px]`}>
            {text}
        </div>
    )
}
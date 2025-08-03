import type { ReactNode } from "react";

export default function GreenButton({ children, onClickFunction }: { children: ReactNode; onClickFunction: () => void }) {
    return (
        <button
            className="bg-[#d6fa8b] px-[20px] py-[10px] rounded-[10px] w-fit cursor-pointer h-fit"
            onClick={onClickFunction}>
            {children}
        </button>
    );
}
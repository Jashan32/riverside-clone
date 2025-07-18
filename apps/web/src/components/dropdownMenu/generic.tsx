export default function GenericDropdown({ title }: { title: string }) {
    return (
        <div className={`bg-[#2b2b2b] select-none text-[12px] p-[12px] py-[8px] rounded-[8px] whitespace-nowrap  absolute left-1/2 -translate-x-1/2 bottom-10 z-10 mt-2 transition-all delay-200 duration-100 ease-in-out opacity-0 pointer-events-none group-hover:opacity-100 `}>
            {title}
        </div>
    );
}
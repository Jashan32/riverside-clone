export default function Sidebar(){
    return (
        <div className=" text-white h-[100vh] w-[232px] mx-[8px]">
        <h2 className="text-lg font-bold">Sidebar</h2>
        <ul className="mt-4 space-y-2">
            <li><a href="/dashboard/home" className="hover:underline">Home</a></li>
            <li><a href="/dashboard/project" className="hover:underline">Projects</a></li>
            <li><a href="/dashboard/schedule" className="hover:underline">Schedule</a></li>
        </ul>
        </div>
    );
}
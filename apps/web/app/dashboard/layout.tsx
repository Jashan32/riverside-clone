
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"bg-[#151515] flex"}>
      <Sidebar />
      <div className="flex-1 h-[100vh] flex flex-col">
        <Navbar />
        <div className="p-[8px] text-white w-[100%] h-[100%]  ">
          <div className="bg-[#0d0d0d]  rounded-[12px] border-[1px] border-b-0 border-white/7 h-[100%] ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

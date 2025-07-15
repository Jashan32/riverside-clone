
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="bg-[#151515] flex h-[100vh] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full">
        <Navbar />
        <div className="flex-1 p-2 pt-0 text-white w-full">
          <div className="bg-[#0d0d0d] rounded-[12px] border border-b-0 border-white/10 h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

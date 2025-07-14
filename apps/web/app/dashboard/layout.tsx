import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"bg-[#151515] h-[100vh]"}>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
}

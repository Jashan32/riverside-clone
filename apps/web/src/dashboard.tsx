import { useParams } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Home from "./home";
import Project from "./project";
import Schedule from "./schedule";

export default function DashboardLayout() {
  const { page } = useParams();

  let content;
  switch (page) {
    case 'home':
      content = <Home />;
      break;
    case 'project':
      content = <Project />;
      break;
    case 'schedule':
      content = <Schedule />;
      break;
    default:
      content = <div>Not found</div>;
  }

  return (
    <div className="bg-[#0d0d0d] flex h-[100vh] overflow-hidden p-2 pl-[0] pt-0">
      <Sidebar />
      <div className="pl-2 flex-1 flex flex-col h-full">
        <Navbar />
        <div className="flex-1 text-white w-full overflow-auto ">
          <div className="bg-[#151515] overflow-auto custom-scrollbar rounded-[12px] border border-b-0 border-white/10 h-full px-[60px] pt-[45px]">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
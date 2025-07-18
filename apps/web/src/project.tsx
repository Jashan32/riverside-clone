import ProjectCard from './components/projectCard.tsx';
import ProjectHeader from './components/projectHeader.tsx';

const data = [
    { title: "Project 1", timeCreated: "1 min" },
    { title: "Project 2", timeCreated: "5 mins" },
    { title: "Project 3", timeCreated: "10 mins" },
    { title: "Project 4", timeCreated: "20 mins" },
    { title: "Project 5", timeCreated: "1 hour" },
    { title: "Project 6", timeCreated: "2 hours" },
    { title: "Project 7", timeCreated: "3 hours" },
    { title: "Project 8", timeCreated: "4 hours" },
    { title: "Project 8", timeCreated: "4 hours" },
    { title: "Project 8", timeCreated: "4 hours" },
    { title: "Project 8", timeCreated: "4 hours" },
]

export default function Project() {
    return (
        <div className="flex flex-col gap-[40px] custom-scrollbar">
            <div>
                <ProjectHeader />
            </div>
            <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[24px]'>
                {
                    data.map((project, index) => (
                        <ProjectCard key={index} title={project.title} timeCreated={project.timeCreated} />
                    ))
                }
            </div>
        </div>
    );
}

import { useState } from 'react';
import ProjectCard from './components/projectCard.tsx';
import ProjectHeader from './components/projectHeader.tsx';
import projectPageImg from './assets/projectsPage.png';
import AddButton from './components/buttons/addButton.tsx';

type ProjectType = {
    title: string;
    timeCreated: string;
};

const data: ProjectType[] = [
    // { title: "Project 1", timeCreated: "1 min" },
    // { title: "Project 2", timeCreated: "5 mins" },
    // { title: "Project 3", timeCreated: "10 mins" },
    // { title: "Project 4", timeCreated: "20 mins" },
    // { title: "Project 5", timeCreated: "1 hour" },
    // { title: "Project 6", timeCreated: "2 hours" },
    // { title: "Project 7", timeCreated: "3 hours" },
    // { title: "Project 8", timeCreated: "4 hours" },
    // { title: "Project 8", timeCreated: "4 hours" },
    // { title: "Project 8", timeCreated: "4 hours" },
    // { title: "Project 8", timeCreated: "4 hours" },
]

export default function Project() {
    const [projectsData, setProjectsData] = useState(data);
    return (
        <div>
            {
                projectsData.length > 0 ? <div className="flex flex-col gap-[40px] custom-scrollbar" >
                    <div>
                        <ProjectHeader />
                    </div>
                    <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[24px]'>
                        {
                            projectsData.map((project, index) => (
                                <ProjectCard key={index} title={project.title} timeCreated={project.timeCreated} />
                            ))
                        }
                    </div>
                </div > :
                    <div className='pt-[96px]'>
                        <div className='flex flex-col items-center'>
                            <img src={projectPageImg} className='h-[120px] mb-[24px]' />
                            <div className='text-[20px] font-extrabold mb-[16px]'>Your masterpiece from A to Z</div>
                            <div className='text-[12px] font-medium text-[#888888] mb-[16px]'>Stay organized and keep all your episode assets in one spot for easy access.</div>
                            <AddButton text={"New project"} type='medium' />
                        </div>
                    </div>
            }

        </div>

    );

}

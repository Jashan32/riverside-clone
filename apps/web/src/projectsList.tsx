import { useEffect, useState } from 'react';
import ProjectCardGrid from './components/cards/projectCardGrid.tsx';
import ProjectCardList from './components/cards/projectCardList.tsx';
import ProjectHeader from './components/headers/projectHeader.tsx';
import projectPageImg from './assets/projectsPage.png';
import AddButton from './components/buttons/addButton.tsx';
import RemoveCard from './components/cards/removeCard.tsx';

type ProjectType = {
    title: string;
    id: string
    createdAt: string;
};

export default function Project() {
    const backEndUrl = import.meta.env.VITE_BACKEND_URL
    const [projectsData, setProjectsData] = useState<ProjectType[]>([]);
    const [projectsDataAll, setProjectsDataAll] = useState<ProjectType[]>([]);
    const [removeCardState, setRemoveCardState] = useState(false);
    const [listView, setListView] = useState(localStorage.getItem('listView') === 'true');
    const [sortState, setSortState] = useState(localStorage.getItem('sortState') || 'newest');

    useEffect(() => {
        async function fetchSessions() {
            const result = await fetch(`${backEndUrl}/project/all`, {
                headers: {
                    "token": `${localStorage.getItem("authToken")}`,
                },
            });
            const parsed = await result.json();
            setProjectsData(parsed.data);
            setProjectsDataAll(parsed.data);
        }
        fetchSessions();
    }, []);

    useEffect(() => {
        const getSortedData = () => {
            if (sortState === "a-z") {
                return [...projectsData].sort((a, b) => a.title.localeCompare(b.title));
            }
            if (sortState === "z-a") {
                return [...projectsData].sort((a, b) => b.title.localeCompare(a.title));
            }
            if (sortState === "newest") {
                // Assuming higher number means newer
                return [...projectsData].sort((a, b) => Number(a.createdAt) - Number(b.createdAt));
            }
            if (sortState === "oldest") {
                // Lower number means older
                return [...projectsData].sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
            }
            return projectsData;
        };

        const sortedProjects = getSortedData();
        setProjectsData(sortedProjects);
    }, [sortState])

    return (
        <div>
            {removeCardState && <div className='fixed flex justify-center items-center inset-0 z-[10] bg-black/55'>
                <RemoveCard title={"Project A"} setRemoveCardState={setRemoveCardState} />
            </div>}
            {
                projectsData.length > 0 || projectsDataAll.length > 0 ? <div className="px-[60px] pt-[45px] flex flex-col gap-[40px] " >
                    <div>
                        <ProjectHeader setProjectsData={setProjectsData} setProjectsDataAll={setProjectsDataAll} projectsDataAll={projectsDataAll} setSortState={setSortState} sortState={sortState} setListView={setListView} listView={listView} />
                    </div>
                    {listView ? <div className='flex flex-col gap-[8px]'>
                        {
                            projectsData.map((project, index) => (
                                <ProjectCardList setRemoveCardState={setRemoveCardState} key={index} projectId={project.id} projectName={project.title} timeCreated={project.createdAt} />
                            ))
                        }
                    </div> : <div className='grid relative 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[24px]'>
                        {
                            projectsData.map((project, index) => (
                                <ProjectCardGrid setRemoveCardState={setRemoveCardState} key={index} projectId={project.id} projectName={project.title} timeCreated={project.createdAt} />
                            ))
                        }
                    </div>}
                </div > :
                    <div className='px-[60px] pt-[96px]'>
                        <div className='flex flex-col items-center'>
                            <img src={projectPageImg} className='h-[120px] mb-[24px]' />
                            <div className='text-[20px] font-extrabold mb-[16px]'>Your masterpiece from A to Z</div>
                            <div className='text-[12px] font-medium text-[#888888] mb-[16px]'>Stay organized and keep all your episode assets in one spot for easy access.</div>
                            <AddButton text={"New project"} type='medium' onClickFunction={() => { }} />
                        </div>
                    </div>
            }
        </div>
    );
}

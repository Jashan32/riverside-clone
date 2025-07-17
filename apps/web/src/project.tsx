import ProjectCard from './components/projectCard.tsx';
import ProjectHeader from './components/projectHeader.tsx';
export default function Project() {
    return (
        <div className="flex flex-col">
            <div>
                <ProjectHeader />
            </div>
            <ProjectCard title="Project 1" timeCreated="1 min" />
        </div>
    );
}

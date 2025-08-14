import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom'; 
import { getProjectBySlug } from '../../data/projectData';


import Header from '../Homepage/Header'; 
import Footer from '../Homepage/Footer'; 

const ProjectPage = () => {
    const { projectSlug } = useParams(); 
    const project = getProjectBySlug(projectSlug); 
     useEffect(() => {
    document.title = 'IntegralX - Project';
  }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto' 
        });
    }, []); 

    if (!project) {
        console.warn(`Project with slug "${projectSlug}" not found.`);
        return <Navigate to="/" replace />;
    }


    return (
        <>
            <div id="project_page" className="bg-black text-white font-sans flex flex-col">
                <Header />
                <main className="flex-grow py-16 md:py-20 px-4 sm:px-6 lg:px-8 lg:mx-auto">
                    <div className="flex lg:justify-between max-w-7xl"> 
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 lg:ml-4 items-center">

                            <div className="text-gray-300 order-2 md:order-1"> 
                                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                                    {project.title}
                                </h1>
                                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">
                                    {project.subtitle}
                                </h2>

                                <h3 className="text-lg font-bold text-white mt-8 mb-3 lg:text-2xl">Description:</h3>
                                <p className="text-lg leading-relaxed font-normal mb-8">
                                    {project.description}
                                </p>

                                <h3 className="text-lg font-bold text-white mt-8 mb-3 lg:text-2xl">Key Features:</h3>
                                <ul className="list-disc list-inside space-y-2 mb-14">
                                    {project.keyFeatures.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>

                                {project.projectLink && project.projectLink !== '#' && (
                                    <a
                                        href={project.projectLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='px-7 py-4 self-center md:self-start rounded-lg font-semibold text-sm md:text-base text-white bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-300 hover:to-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-400 transition duration-300 ease-in-out shadow-md hover:shadow-lg lg:mt-4'
                                    >
                                        Project Link
                                    </a>
                                )}
                            </div>
                            <div className="flex justify-center items-center order-1 md:order-2">
                                <img
                                    src={project.detailImageSrc || project.src} 
                                    alt={project.alt}
                                    className="rounded-lg shadow-xl w-full max-w-md lg:max-w-[630px] lg:max-h-[600px] object-contain" 
                                    loading="lazy"
                                />
                            </div>

                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default ProjectPage;
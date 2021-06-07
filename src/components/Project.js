import React, {useEffect, useState} from 'react';


import sanityClient from '../client'



export default function Project() {
 const [projectData, setProjectData] = useState(null);

 useEffect(()=>{
     sanityClient
     .fetch(`*[_type=='project']{title, date, place, description, projectType, link, tags}`)
     .then(res=>{
         console.log(res)
         setProjectData(res)
     })
     .catch(console.error)
 },[])





    return (
        <main className='bg-pink-100 min-h-screen p-12'>
        <section className='container mx-auto'>
            <h1 className='text-5xl flex justify-center cursive'>My projects</h1>
            <h2 className='text-lg text-pink-600 flex justify-center mb-12'>Welcome to my projects page!</h2>
            <section className='grid grid-cols-2 gap-8'>
{projectData && projectData.map((project, index)=>{
    return (
        <article className='relative rounded-lg shadow-xl bg-white p-16'>
                    <h3 className='text-pink-800 text-3xl font-bold mb-2 hover:text-pink-700'>
                    <a href={project.link} alt={project.title} target='_blank' rel="noopener noreferrer">{project.title}</a>
                    </h3>
                    <div className='text-pink-400 text-xs space-x-4'>
                        <span>
                            <strong className='font-bold'>Finished on </strong> :{" "}
                            {new Date(project.date).toLocaleDateString()}
                        </span>
                        <span>
                            <strong className='font-bold'>Company</strong>:{" "}
                            {project.place}
                        </span>
                        <span>
                            <strong className='font-bold'>Type</strong>:{" "}
                            {project.projectType}
                        </span>
                        <p className='my-6 text-lg text-gray-700 leading-relaxed'>{project.description}</p>
                        <a href={project.link} rel="noopener noreferrer" target='_blank' className="text-pink-500 font-bold hover:underline hover:text-pink-400">
                        View The Project{" "}
                        <span role='img' aria-label='right pointer'>👉</span> 
                        </a>
                    
                    </div>
                </article>
    )
})}


        
            </section>
        </section>
            
        </main>
    )
}

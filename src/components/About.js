import React, {useState, useEffect} from 'react';
import sanityClient from '../client';

import BackgroundImage from '../photo.jpg';

import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'



const builder = imageUrlBuilder(sanityClient);
function urlFor(source){
    return builder.image(source)
}

export default function About() {
const [author, setAuthor] = useState(null)


useEffect(()=>{
    sanityClient.fetch(`*[_type == "author"]{
        name,
        bio,
        "authorImage":image.asset->url
    }`)
    .then((res)=>setAuthor(res[0]))
    .catch(console.error)
},[])



    return (
        <>
            {!author && <div>Loading......</div>||

            <main className="relative">
            <img src={BackgroundImage} alt='background photo' className="absolute w-full"/>
            <div className="p-10 lg:pt-48 container mx-auto relative">
                <section className="bg-pink-800 rounded-lg shadow-2xl lg:flex p-20">
                    <img src={urlFor(author.authorImage).url()} className="rounded w-32 h-32 lg:w-64 h-64 mr-8" alt={author.name}/>
                    <div className="text-lg flex flex-col justify-center">
                        <h1 className="cursie text-6xl text-pink-300 mb-4 ">Hey there. I'm {" "}
                        <span className="text-pink-100"></span>{author.name}</h1>
                        <div className="prose lg:prose-xl text-white">
                            <BlockContent blocks={author.bio} projectId="hru5999t" dataset="production"/>
                        </div>
                    </div>
                </section>
            </div>

            </main>
            
            
            }
        </>
    )
}

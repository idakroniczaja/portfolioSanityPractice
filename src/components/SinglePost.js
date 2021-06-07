import React, {useState, useEffect} from 'react';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '../client.js';
import  { useParams }  from 'react-router-dom';
import BlockContent from '@sanity/block-content-to-react'

const builder = imageUrlBuilder(sanityClient);
function urlFor(source){
    return builder.image(source)
}



export default function SinglePost() {
    const [singlePost, setSinglePost] = useState(null);

    const {slug} = useParams();

    useEffect(()=>{
        sanityClient
        .fetch(`*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            mainImage{
                asset->{
                    _id,
                    url
                }
            },
            body,
            "name":author->name,
            "authorImage": author->image,
        }`)
        .then((res)=>setSinglePost(res[0]))
        .catch(console.error)
    },[slug])



    return (
        <>
        {!singlePost && <div>Loading.....</div> ||
        
        <main className='bg-gray-200 min-h-screen p-12'>
            <article className='container shadow-lg mx-auto bg-pink-100 rounded-lg'>
                <header className='relative'> 
                    <div className='absolute h-full w-full flex items-center justify-center p-8'>
                        <div className='br-white bg-opacity-75 rounded p-12'>
                            <h1 className='cursive text-3xl lg:text-6xl mb-4'> {singlePost.title}</h1>
                            <div className='flex justify-center text-pink-800'>
                                <img src={urlFor(singlePost.authorImage).url()} alt={singlePost.name} className="w-10 h-10 rounded-full"/>
                            </div>
                            <p className='cursive flex items-center pl-2 text-2xl'>{singlePost.name}</p>
                        </div>
                    </div>
                    <img src={singlePost.mainImage.asset.url} alt={singlePost.title} className="w-full object-cover rounded-t" height="400px"/>
                </header>
                <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full"><BlockContent blocks={singlePost.body} projectId='hru5999t' dataset='production'/></div>
            </article>
        </main>
        
        }
        
        </>
    )
}

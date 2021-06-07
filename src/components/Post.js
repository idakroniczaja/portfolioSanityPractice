import { getByTitle } from "@testing-library/dom";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

import sanityClient from "../client";

export default function Post() {
  const [postData, setPost] = useState(null);

  useEffect(() => {
    sanityClient.fetch(
      '*[_type == "post"]{title,slug,mainImage{asset->{_id,url},alt}}'
    )
    .then(res=>{
        console.log(res)
        setPost(res)
    } )
    .catch(console.error)
  },[]);






  return (
      <main className='bg-pink-100 min-h-screen p-12'>
<section className='container mx-auto'>
              <h1 className='text-5xl flex justify-center cursive'>Blog post page</h1>
              <h2 className='text-lg text-gray-600 flex justify-center mb-12'>Welcome!</h2>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'  >
              { postData && postData.map((post, index)=>{
                  return(
                <article >
                     <Link to={`/post/${post.slug.current}`} key={post.slug.current} >
                      <span className='block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-pink-800' key={index}>
                        <img src={post.mainImage.asset.url} alt={post.title} className='w-full h-full rounded-r object-cover absolute'/>
                          <span className='block relative h-full flex justify-end items-end pr-4 pb-4'></span>
                          <h3 className='text-pink-100 text-lg font-blog px-3 py-4 bg-pink-700 text-pink-100 bg-opacity-75 rounded'>{post.title}</h3>
                      </span>
                    </Link>    
                </article> 
                  )})
              }
              </div>
          </section> 
      </main>
  );
}

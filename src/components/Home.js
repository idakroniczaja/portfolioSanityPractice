import React from 'react';
import image from '../joanna-kosinska-ToV0rS9nTYs-unsplash.jpg'

export default function Home() {
    return (
        <main>
            <img src={image} alt='flowers' className='absolute object-cover w-full h-full'/>
            <section className="relative flex justify-center min-h-screen pt-12 lg:pt-64 px-8">
                <h1 className='text-6xl text-pink-900 font-bold cursive leading-none lg:leading-snug home-name'>Zdravo. I'm Ida.</h1>
            </section>
        </main>
    )
}

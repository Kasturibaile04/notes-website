import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Hero from './Hero';
import Card from './Card';

function Home(){
  const[posts, setPosts] = useState([]);


    const getPosts = async () => {
    try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    setPosts(data);
    }
    catch(error){
      console.log("Error : ", error);
    }

  }
  useEffect(() => {
  getPosts();
  },[]);
  return (
    <>
    <Navbar/>
    <Hero/>
    <section className='py-10 bg-gray-100'>
    <div className='max-w-7xl mx-auto px-4'>
      <h2 className="text-2xl font-bold m-8 text-center">Latest Blog Posts</h2>
      <div className='grid grid-cols-3 gap-6'>
    {
      posts.map((post) => (
       <Card key={post.id}
            title = {post.title}
            body = {post.body}
          />
           ))}
      </div>
    </div>
  
  
    </section>
    <Footer/>
    </>
  )
}

export default Home



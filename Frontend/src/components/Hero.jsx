import React from 'react'

function Hero() {
  return (
    <section className='bg-gray-100 py-5'>
        <div className='text-center '>
            <h1 className="text-4xl mx-auto  mt-9 font-bold">Welcome to <span className="text-blue-600"> BlogVerse</span></h1>
            <p className="text-lg text-gray-700 mb-6 mt-6">
                Discover amazing blog posts and articles on technology,programming,lifestyle,business and more Learn something new every day.
            </p>
            <button className="bg-blue-600 text-white rounded-md hover:bg-blue-800  px-5 py-2 font-medium transition text-ellipsis mx-auto block">
                Explore Blogs
            </button>
        </div>
    </section>
  )
}

export default Hero
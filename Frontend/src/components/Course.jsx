import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';


function FreeCourse({ Course }){
  return(
  
  
    <div className='max-w-7xl mx-auto px-4 py-10'>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Courses</h1>
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Free Courses</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {Course.map((Course) => (
        <div className='bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition duration-300'
        key={Course.id}>
          <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full '>Free</span>
          <h3 className="text-xl font-semibold mb-3 mt-3 ">{Course.title}</h3>
          <p className="text-lg font-semibold text-gray-600 m-2">Rs.499</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
            Enroll Now
          </button>
        </div>
        ))}
      </div>
    </div>
  )


}

function PaidCourse({ Course }){
  return(
    <div className='max-w-7xl mx-auto px-4 py-10'>
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Paid Courses</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {Course.map((Course) => (
        <div className='bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition duration-300'
        key={Course.id}>
          <span className='bg-blue-100 text-blue-600 px-3 py-1 rounded-full '>Premium</span>
          <h3 className="text-xl font-semibold mb-3 mt-3 ">{Course.title}</h3>
          <p className="text-lg font-semibold text-gray-600 m-2">Rs.499</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Enroll Now
          </button>
        </div>
        ))}
      </div>
    </div>
  )
} 


function Course () {
  // const [freeCourse] = useState("html css js React JS");
  // const [paidCourse] = useState("Nextjs Mongodb Node JS");
  const [Course , setCourse] = useState([]);

  const getPosts = async () => {
      try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await response.json();
      setCourse(data.slice(0,20));
      }
      catch(error){
        console.log("Error : ", error);
      }
  
    }
    useEffect(() => {
    getPosts();
    },[]);

    const freeCourses = Course.filter(course => !course.completed);
    const paidCourses = Course.filter(course => course.completed);



return (
  <>
  <Navbar/>
  <div className='max-w-7xl mx-auto px-4 py-10'>
  <FreeCourse Course={freeCourses} />
  <PaidCourse Course={paidCourses} />
  </div>
  <Footer/>
  </>
)

}

export default Course;

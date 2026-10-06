import React from 'react'

function Card({title, body}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300  border-gray-50">
        <h2 className="text-xl font-semibold mb-3 text-gray-800 ">{title}</h2>
        <p className="text-gray-600 mb-5">{body}</p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Read More ➜</button>
    </div>
  )
}

export default Card
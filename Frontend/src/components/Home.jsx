import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Hero from './Hero';
import Card from './Card';
import { useAuth } from '../context-api/AuthContext';

function Home(){
  const { isAdmin } = useAuth();
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', body: '' });
  const [editingId, setEditingId] = useState(null);

  const getPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const resetForm = () => {
    setForm({ title: '', body: '' });
    setEditingId(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAdmin) return;
    if (!form.title.trim() || !form.body.trim()) return;

    if (editingId) {
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === editingId ? { ...post, title: form.title, body: form.body } : post
        )
      );
    } else {
      const newPost = {
        id: Date.now(),
        title: form.title,
        body: form.body,
      };
      setPosts(prevPosts => [newPost, ...prevPosts]);
    }

    resetForm();
  };

  const handleEdit = (post) => {
    if (!isAdmin) return;
    setEditingId(post.id);
    setForm({ title: post.title, body: post.body });
  };

  const handleDelete = (postId) => {
    if (!isAdmin) return;
    if (!window.confirm('Delete this block?')) return;

    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    if (editingId === postId) resetForm();
  };

  return (
    <>
      <Navbar />
      <Hero />

      {isAdmin && (
        <section className='max-w-4xl mx-auto px-4 py-8'>
          <form onSubmit={handleSubmit} className='bg-white rounded-xl shadow-md p-6 border'>
            <h3 className='text-xl font-bold mb-4'>Manage Blog Block</h3>

            <input
              type='text'
              name='title'
              value={form.title}
              onChange={handleChange}
              placeholder='Block title'
              className='w-full border border-gray-300 rounded-md px-4 py-2 mb-4'
            />

            <textarea
              name='body'
              value={form.body}
              onChange={handleChange}
              placeholder='Block description'
              className='w-full border border-gray-300 rounded-md px-4 py-2 mb-4'
              rows='4'
            />

            <div className='flex gap-3'>
              <button
                type='submit'
                className='bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700'
              >
                {editingId ? 'Update Block' : 'Create Block'}
              </button>

              {editingId && (
                <button
                  type='button'
                  onClick={resetForm}
                  className='bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400'
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>
      )}

      <section className='py-10 bg-gray-100'>
        <div className='max-w-7xl mx-auto px-4'>
          <h2 className="text-2xl font-bold m-8 text-center">Latest Blog Posts</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
            {posts.map((post) => (
              <div key={post.id} className='relative'>
                <Card title={post.title} body={post.body} />

                {isAdmin && (
                  <div className='mt-3 flex gap-2 justify-center'>
                    <button
                      onClick={() => handleEdit(post)}
                      className='bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;


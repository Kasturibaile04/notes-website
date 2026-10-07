import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context-api/AuthContext'

// Change these to match your backend routes
const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'
const ENDPOINTS = {
  list: `${API}/course/courses`,
  create: `${API}/course/create`,
  update: (id) => `${API}/course/update/${id}`,
  remove: (id) => `${API}/course/delete/${id}`,
}

const EMPTY_FORM = { title: '', description: '', price: '', image: '' }

function Admin() {
  const { token, role } = useAuth()
  const isAdmin = role === 'admin'

  const [courses, setCourses] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null) // { type: 'success' | 'error', text }

  const headers = useMemo(
    () => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
    [token]
  )

  const notify = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  // Generic request helper: throws with the server's message on failure
  const request = useCallback(
    async (url, options = {}) => {
      const res = await fetch(url, { headers, ...options })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || data.errors || 'Request failed')
      return data
    },
    [headers]
  )

  // READ (everyone who can open this page)
  const loadCourses = useCallback(async () => {
    try {
      setLoading(true)
      const data = await request(ENDPOINTS.list)
      setCourses(data.courses || data)
    } catch (err) {
      notify('error', err.message)
    } finally {
      setLoading(false)
    }
  }, [request])

  useEffect(() => {
    loadCourses()
  }, [loadCourses])

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const resetForm = () => {
    setForm(EMPTY_FORM)
    setEditingId(null)
  }

  // CREATE + UPDATE (admin only)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isAdmin) return
    if (!form.title.trim() || !form.description.trim() || form.price === '') {
      return notify('error', 'Title, description and price are required')
    }

    const body = JSON.stringify({ ...form, price: Number(form.price) })

    try {
      setSaving(true)
      if (editingId) {
        await request(ENDPOINTS.update(editingId), { method: 'PUT', body })
        notify('success', 'Course updated')
      } else {
        await request(ENDPOINTS.create, { method: 'POST', body })
        notify('success', 'Course created')
      }
      resetForm()
      loadCourses()
    } catch (err) {
      notify('error', err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (course) => {
    if (!isAdmin) return
    setEditingId(course._id)
    setForm({
      title: course.title,
      description: course.description,
      price: course.price,
      image: course.image?.url || course.image || '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // DELETE (admin only)
  const handleDelete = async (id) => {
    if (!isAdmin) return
    if (!window.confirm('Delete this course? This cannot be undone.')) return
    try {
      await request(ENDPOINTS.remove(id), { method: 'DELETE' })
      setCourses((list) => list.filter((c) => c._id !== id))
      if (editingId === id) resetForm()
      notify('success', 'Course deleted')
    } catch (err) {
      notify('error', err.message)
    }
  }

  const filtered = courses.filter((c) =>
    c.title?.toLowerCase().includes(search.toLowerCase())
  )

  const inputClass =
    'w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isAdmin ? 'Admin Dashboard' : 'Courses'}
            </h1>
            <p className="text-sm text-gray-500">
              {isAdmin
                ? 'Create, update and delete courses.'
                : 'You have view-only access.'}
            </p>
          </div>
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${inputClass} md:w-64`}
          />
        </header>

        {message && (
          <div
            className={`mb-4 rounded px-4 py-2 text-sm ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form: admins only */}
        {isAdmin && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 grid gap-3 rounded bg-white p-5 shadow-md md:grid-cols-2"
          >
            <h2 className="text-lg font-semibold text-gray-800 md:col-span-2">
              {editingId ? 'Edit course' : 'Add a new course'}
            </h2>
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="price"
              type="number"
              min="0"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
              className={`${inputClass} md:col-span-2`}
            />
            <textarea
              name="description"
              rows="3"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className={`${inputClass} md:col-span-2`}
            />
            <div className="flex gap-2 md:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? 'Saving...' : editingId ? 'Update course' : 'Create course'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}

        {/* List: everyone */}
        {loading ? (
          <p className="text-center text-gray-500">Loading courses...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500">No courses found.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => (
              <div
                key={course._id}
                className="flex flex-col overflow-hidden rounded bg-white shadow-md"
              >
                {(course.image?.url || course.image) && (
                  <img
                    src={course.image?.url || course.image}
                    alt={course.title}
                    className="h-40 w-full object-cover"
                  />
                )}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-semibold text-gray-800">{course.title}</h3>
                  <p className="mt-1 line-clamp-3 flex-1 text-sm text-gray-600">
                    {course.description}
                  </p>
                  <p className="mt-2 font-bold text-gray-800">₹{course.price}</p>

                  {isAdmin && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(course)}
                        className="flex-1 rounded bg-amber-500 px-3 py-1.5 text-sm text-white hover:bg-amber-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="flex-1 rounded bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
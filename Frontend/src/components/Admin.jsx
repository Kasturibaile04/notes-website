import React, { useState } from 'react'

// Reads the logged-in user, e.g. localStorage.setItem('user', JSON.stringify({ name: 'Ravi', role: 'admin' }))
// Replace this with your auth context / Redux store / API call.
function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('user')) || { role: 'user' }
  } catch {
    return { role: 'user' }
  }
}

function Admin({ user = getCurrentUser() }) {
  const isAdmin = user.role === 'admin'

  // Demo data. Replace with data fetched from your backend.
  const [items, setItems] = useState([
    { id: 1, title: 'First post', description: 'Hello world' },
    { id: 2, title: 'Second post', description: 'Another item' },
  ])

  const [form, setForm] = useState({ title: '', description: '' })
  const [editingId, setEditingId] = useState(null)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const resetForm = () => {
    setForm({ title: '', description: '' })
    setEditingId(null)
  }

  // CREATE and UPDATE (admin only)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isAdmin) return // guard in the handler too, not just the UI
    if (!form.title.trim()) return

    if (editingId) {
      setItems(items.map((i) => (i.id === editingId ? { ...i, ...form } : i)))
    } else {
      setItems([...items, { id: Date.now(), ...form }])
    }
    resetForm()
  }

  const handleEdit = (item) => {
    if (!isAdmin) return
    setEditingId(item.id)
    setForm({ title: item.title, description: item.description })
  }

  // DELETE (admin only)
  const handleDelete = (id) => {
    if (!isAdmin) return
    if (!window.confirm('Delete this item?')) return
    setItems(items.filter((i) => i.id !== id))
    if (editingId === id) resetForm()
  }

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '0 1rem' }}>
      <h2>{isAdmin ? 'Admin Dashboard' : 'Items'}</h2>
      <p>
        Logged in as <b>{user.name || 'Guest'}</b> ({user.role})
      </p>

      {/* Form is only rendered for admins */}
      {isAdmin && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
          />
          <button type="submit">{editingId ? 'Update' : 'Create'}</button>
          {editingId && (
            <button type="button" onClick={resetForm} style={{ marginLeft: 8 }}>
              Cancel
            </button>
          )}
        </form>
      )}

      {/* Everyone can view the list */}
      {items.length === 0 && <p>No items yet.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: 6,
              padding: 12,
              marginBottom: 8,
            }}
          >
            <h4 style={{ margin: 0 }}>{item.title}</h4>
            <p style={{ margin: '4px 0 8px' }}>{item.description}</p>

            {/* Edit/Delete buttons only for admins */}
            {isAdmin && (
              <>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ marginLeft: 8 }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Admin
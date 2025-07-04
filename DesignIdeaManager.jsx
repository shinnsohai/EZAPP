import React, { useState, useEffect } from 'react';

const DesignIdeaManager = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    room: '',
    image: '',
    description: '',
    likes: '',
    saves: '',
    designer: ''
  });

  const categories = [
    'Modern', 'Scandinavian', 'Industrial', 'Minimalist', 
    'Contemporary', 'Traditional'
  ];

  const rooms = [
    'Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 
    'Dining Room', 'Home Office', 'Study Room'
  ];

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/content/design-ideas', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setIdeas(data);
      }
    } catch (error) {
      console.error('Error fetching design ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('admin_token');
      const url = editingItem ? `/api/content/design-ideas/${editingItem.id}` : '/api/content/design-ideas';
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          likes: parseInt(formData.likes) || 0,
          saves: parseInt(formData.saves) || 0
        })
      });

      if (response.ok) {
        fetchIdeas();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving design idea:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      room: item.room,
      image: item.image || '',
      description: item.description || '',
      likes: item.likes.toString(),
      saves: item.saves.toString(),
      designer: item.designer || ''
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this design idea?')) return;
    
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/content/design-ideas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchIdeas();
      }
    } catch (error) {
      console.error('Error deleting design idea:', error);
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: '',
      room: '',
      image: '',
      description: '',
      likes: '',
      saves: '',
      designer: ''
    });
  };

  if (loading) {
    return <div className="admin-section">Loading design ideas...</div>;
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2 className="section-title">Design Ideas Management</h2>
      </div>

      {/* Design Idea Form */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Designer</label>
            <input
              type="text"
              name="designer"
              value={formData.designer}
              onChange={handleInputChange}
              placeholder="Designer name"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Room Type</label>
            <select
              name="room"
              value={formData.room}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Room</option>
              {rooms.map(room => (
                <option key={room} value={room.toLowerCase().replace(' ', '')}>{room}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Likes</label>
            <input
              type="number"
              name="likes"
              value={formData.likes}
              onChange={handleInputChange}
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Saves</label>
            <input
              type="number"
              name="saves"
              value={formData.saves}
              onChange={handleInputChange}
              min="0"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="https://..."
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            placeholder="Brief description of the design idea..."
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="add-btn">
            {editingItem ? 'Update Design Idea' : 'Add Design Idea'}
          </button>
          {editingItem && (
            <button type="button" onClick={resetForm} className="edit-btn">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Design Ideas List */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Existing Design Ideas</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Room</th>
              <th>Designer</th>
              <th>Likes</th>
              <th>Saves</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ideas.map(idea => (
              <tr key={idea.id}>
                <td>{idea.title}</td>
                <td>{idea.category}</td>
                <td>{idea.room}</td>
                <td>{idea.designer}</td>
                <td>{idea.likes}</td>
                <td>{idea.saves}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(idea)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(idea.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DesignIdeaManager;


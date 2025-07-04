import React, { useState, useEffect } from 'react';

const ContentManager = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    page: '',
    section: '',
    content_type: 'text',
    content_key: '',
    content_value: ''
  });

  const pages = [
    { value: 'home', label: 'Home Page' },
    { value: 'browse-designers', label: 'Browse Designers' },
    { value: 'design-ideas', label: 'Design Ideas' },
    { value: 'articles', label: 'Articles' },
    { value: 'about', label: 'About' },
    { value: 'contact', label: 'Contact' }
  ];

  const contentTypes = [
    { value: 'text', label: 'Text' },
    { value: 'image', label: 'Image URL' },
    { value: 'json', label: 'JSON Data' }
  ];

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/content', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
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
      const url = editingItem ? `/api/content/${editingItem.id}` : '/api/content';
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchContent();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      page: item.page,
      section: item.section,
      content_type: item.content_type,
      content_key: item.content_key,
      content_value: item.content_value
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this content?')) return;
    
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/content/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchContent();
      }
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      page: '',
      section: '',
      content_type: 'text',
      content_key: '',
      content_value: ''
    });
  };

  if (loading) {
    return <div className="admin-section">Loading content...</div>;
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2 className="section-title">Page Content Management</h2>
      </div>

      {/* Content Form */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Page</label>
            <select
              name="page"
              value={formData.page}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Page</option>
              {pages.map(page => (
                <option key={page.value} value={page.value}>
                  {page.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Section</label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              placeholder="e.g., hero, testimonials, etc."
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Content Type</label>
            <select
              name="content_type"
              value={formData.content_type}
              onChange={handleInputChange}
              required
            >
              {contentTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Content Key</label>
            <input
              type="text"
              name="content_key"
              value={formData.content_key}
              onChange={handleInputChange}
              placeholder="e.g., title, description, image_url"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Content Value</label>
          <textarea
            name="content_value"
            value={formData.content_value}
            onChange={handleInputChange}
            placeholder="Enter the content value..."
            required
            rows="4"
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="add-btn">
            {editingItem ? 'Update Content' : 'Add Content'}
          </button>
          {editingItem && (
            <button type="button" onClick={resetForm} className="edit-btn">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Content List */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Existing Content</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Page</th>
              <th>Section</th>
              <th>Key</th>
              <th>Type</th>
              <th>Value Preview</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {content.map(item => (
              <tr key={item.id}>
                <td>{item.page}</td>
                <td>{item.section}</td>
                <td>{item.content_key}</td>
                <td>{item.content_type}</td>
                <td>
                  {item.content_value.length > 50 
                    ? `${item.content_value.substring(0, 50)}...`
                    : item.content_value
                  }
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
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

export default ContentManager;


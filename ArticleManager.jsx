import React, { useState, useEffect } from 'react';

const ArticleManager = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    date: '',
    read_time: '',
    image: '',
    excerpt: '',
    content: '',
    tags: ''
  });

  const categories = [
    'Design Tips', 'Trends', 'Renovation', 'Budget', 'Guides'
  ];

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/content/articles', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
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
      const url = editingItem ? `/api/content/articles/${editingItem.id}` : '/api/content/articles';
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
        fetchArticles();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      author: item.author,
      date: item.date,
      read_time: item.read_time || '',
      image: item.image || '',
      excerpt: item.excerpt || '',
      content: item.content || '',
      tags: item.tags || ''
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/content/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchArticles();
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: '',
      author: '',
      date: '',
      read_time: '',
      image: '',
      excerpt: '',
      content: '',
      tags: ''
    });
  };

  if (loading) {
    return <div className="admin-section">Loading articles...</div>;
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2 className="section-title">Article Management</h2>
      </div>

      {/* Article Form */}
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
            <label>Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
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
                <option key={cat} value={cat.toLowerCase().replace(' ', '')}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Read Time</label>
            <input
              type="text"
              name="read_time"
              value={formData.read_time}
              onChange={handleInputChange}
              placeholder="e.g., 5 min read"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Publication Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
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
        </div>

        <div className="form-group">
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="e.g., design tips, small spaces, organization"
          />
        </div>

        <div className="form-group">
          <label>Excerpt</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            rows="3"
            placeholder="Brief summary of the article..."
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows="8"
            placeholder="Full article content..."
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="add-btn">
            {editingItem ? 'Update Article' : 'Add Article'}
          </button>
          {editingItem && (
            <button type="button" onClick={resetForm} className="edit-btn">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Articles List */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Existing Articles</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date</th>
              <th>Read Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.category}</td>
                <td>{article.author}</td>
                <td>{new Date(article.date).toLocaleDateString()}</td>
                <td>{article.read_time}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(article)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(article.id)}
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

export default ArticleManager;


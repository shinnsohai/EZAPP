import React, { useState, useEffect } from 'react';
import ImageUpload from '../components/ImageUpload';

const DesignerManager = () => {
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDesigner, setEditingDesigner] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    reviews: 0,
    category: '',
    location: '',
    image: '',
    description: '',
    projects: 0,
    experience: ''
  });

  useEffect(() => {
    fetchDesigners();
  }, []);

  const fetchDesigners = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/content/designers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDesigners(data);
      }
    } catch (error) {
      console.error('Error fetching designers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('admin_token');
      const url = editingDesigner 
        ? `/api/content/designers/${editingDesigner.id}`
        : '/api/content/designers';
      
      const method = editingDesigner ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        await fetchDesigners();
        resetForm();
        alert(editingDesigner ? 'Designer updated successfully!' : 'Designer created successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Operation failed');
      }
    } catch (error) {
      console.error('Error saving designer:', error);
      alert('Operation failed');
    }
  };

  const handleEdit = (designer) => {
    setEditingDesigner(designer);
    setFormData({
      name: designer.name,
      rating: designer.rating,
      reviews: designer.reviews,
      category: designer.category,
      location: designer.location,
      image: designer.image || '',
      description: designer.description || '',
      projects: designer.projects,
      experience: designer.experience || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this designer?')) return;
    
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/content/designers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        await fetchDesigners();
        alert('Designer deleted successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Delete failed');
      }
    } catch (error) {
      console.error('Error deleting designer:', error);
      alert('Delete failed');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      rating: 0,
      reviews: 0,
      category: '',
      location: '',
      image: '',
      description: '',
      projects: 0,
      experience: ''
    });
    setEditingDesigner(null);
    setShowForm(false);
  };

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({ ...prev, image: imageUrl }));
  };

  if (loading) return <div>Loading designers...</div>;

  return (
    <div className="content-manager">
      <div className="manager-header">
        <h2>Designer Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          Add New Designer
        </button>
      </div>

      {showForm && (
        <div className="form-modal">
          <div className="form-container">
            <div className="form-header">
              <h3>{editingDesigner ? 'Edit Designer' : 'Add New Designer'}</h3>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="content-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Designer Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Modern">Modern</option>
                    <option value="Scandinavian">Scandinavian</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Minimalist">Minimalist</option>
                    <option value="Contemporary">Contemporary</option>
                    <option value="Traditional">Traditional</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location *</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  >
                    <option value="">Select Location</option>
                    <option value="Central Singapore">Central Singapore</option>
                    <option value="North Singapore">North Singapore</option>
                    <option value="South Singapore">South Singapore</option>
                    <option value="East Singapore">East Singapore</option>
                    <option value="West Singapore">West Singapore</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Experience</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    placeholder="e.g., 5 years"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Rating</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Reviews Count</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.reviews}
                    onChange={(e) => setFormData({...formData, reviews: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Projects Count</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.projects}
                    onChange={(e) => setFormData({...formData, projects: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <ImageUpload
                onImageUpload={handleImageUpload}
                currentImage={formData.image}
                label="Designer Profile Image"
              />

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="4"
                  placeholder="Brief description of the designer's style and expertise..."
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingDesigner ? 'Update Designer' : 'Create Designer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="content-list">
        <div className="list-header">
          <span>Name</span>
          <span>Category</span>
          <span>Location</span>
          <span>Rating</span>
          <span>Projects</span>
          <span>Actions</span>
        </div>
        
        {designers.map(designer => (
          <div key={designer.id} className="list-item">
            <div className="item-info">
              {designer.image && (
                <img src={designer.image} alt={designer.name} className="item-image" />
              )}
              <span className="item-name">{designer.name}</span>
            </div>
            <span>{designer.category}</span>
            <span>{designer.location}</span>
            <span>⭐ {designer.rating} ({designer.reviews})</span>
            <span>{designer.projects}</span>
            <div className="item-actions">
              <button onClick={() => handleEdit(designer)} className="btn-edit">
                Edit
              </button>
              <button onClick={() => handleDelete(designer.id)} className="btn-delete">
                Delete
              </button>
            </div>
          </div>
        ))}
        
        {designers.length === 0 && (
          <div className="empty-state">
            <p>No designers found. Create your first designer!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignerManager;


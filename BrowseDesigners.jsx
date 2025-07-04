import React, { useState, useEffect } from 'react';
import './BrowseDesigners.css';

const BrowseDesigners = () => {
  const [designers, setDesigners] = useState([]);
  const [filteredDesigners, setFilteredDesigners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    location: 'all'
  });

  const categories = ['all', 'modern', 'scandinavian', 'industrial', 'minimalist', 'contemporary', 'traditional'];
  const locations = ['all', 'central singapore', 'north singapore', 'south singapore', 'east singapore', 'west singapore'];

  useEffect(() => {
    fetchDesigners();
  }, []);

  useEffect(() => {
    filterDesigners();
  }, [designers, filters]);

  const fetchDesigners = async () => {
    try {
      const response = await fetch('/api/content/public/designers');
      if (response.ok) {
        const data = await response.json();
        setDesigners(data);
      }
    } catch (error) {
      console.error('Error fetching designers:', error);
      // Fallback to static data if API fails
      setDesigners(getStaticDesigners());
    } finally {
      setLoading(false);
    }
  };

  const filterDesigners = () => {
    let filtered = designers;

    if (filters.category !== 'all') {
      filtered = filtered.filter(designer => 
        designer.category.toLowerCase() === filters.category
      );
    }

    if (filters.location !== 'all') {
      filtered = filtered.filter(designer => 
        designer.location.toLowerCase().includes(filters.location.replace(' singapore', ''))
      );
    }

    setFilteredDesigners(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getStaticDesigners = () => [
    {
      id: 1,
      name: "Design Studio Alpha",
      rating: 4.9,
      reviews: 127,
      category: "Modern",
      location: "Central Singapore",
      description: "Specializing in modern and contemporary designs with a focus on functionality and aesthetics.",
      projects: 85,
      experience: "8 years",
      image: "/hero_interior.png"
    },
    {
      id: 2,
      name: "Nordic Home Design",
      rating: 4.8,
      reviews: 94,
      category: "Scandinavian",
      location: "North Singapore",
      description: "Creating warm, cozy spaces with Scandinavian design principles and natural materials.",
      projects: 62,
      experience: "6 years",
      image: "/hero_interior.png"
    },
    {
      id: 3,
      name: "Urban Loft Interiors",
      rating: 4.7,
      reviews: 156,
      category: "Industrial",
      location: "Central Singapore",
      description: "Industrial-style interiors with exposed elements and modern urban aesthetics.",
      projects: 103,
      experience: "10 years",
      image: "/hero_interior.png"
    },
    {
      id: 4,
      name: "Zen Living Spaces",
      rating: 4.9,
      reviews: 89,
      category: "Minimalist",
      location: "East Singapore",
      description: "Minimalist designs that emphasize simplicity, functionality, and peaceful living.",
      projects: 71,
      experience: "7 years",
      image: "/hero_interior.png"
    },
    {
      id: 5,
      name: "Contemporary Creations",
      rating: 4.8,
      reviews: 112,
      category: "Contemporary",
      location: "West Singapore",
      description: "Contemporary designs that blend modern trends with timeless elegance.",
      projects: 95,
      experience: "9 years",
      image: "/hero_interior.png"
    },
    {
      id: 6,
      name: "Elegant Interiors Co.",
      rating: 4.6,
      reviews: 78,
      category: "Modern",
      location: "South Singapore",
      description: "Elegant and sophisticated interior solutions for discerning homeowners.",
      projects: 54,
      experience: "5 years",
      image: "/hero_interior.png"
    }
  ];

  if (loading) {
    return (
      <div className="page-hero">
        <div className="hero-content">
          <h1>Loading designers...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="browse-designers">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-content">
          <h1>Browse Interior Designers</h1>
          <p>Discover talented interior designers who can transform your space into something extraordinary.</p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="container">
          <div className="filters">
            <div className="filter-group">
              <label>Category:</label>
              <select 
                value={filters.category} 
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Location:</label>
              <select 
                value={filters.location} 
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location.charAt(0).toUpperCase() + location.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="results-count">
            {filteredDesigners.length} designers found
          </div>
        </div>
      </section>

      {/* Designers Grid */}
      <section className="designers-grid">
        <div className="container">
          <div className="grid">
            {filteredDesigners.map(designer => (
              <div key={designer.id} className="designer-card">
                <div className="designer-image">
                  <img src={designer.image || "/hero_interior.png"} alt={designer.name} />
                  <div className="image-overlay">
                    <button className="view-portfolio-btn">View Portfolio</button>
                  </div>
                </div>
                <div className="designer-info">
                  <h3>{designer.name}</h3>
                  <div className="rating">
                    <span className="stars">⭐⭐⭐⭐⭐</span>
                    <span className="rating-text">{designer.rating} ({designer.reviews} reviews)</span>
                  </div>
                  <p className="description">{designer.description}</p>
                  <div className="designer-stats">
                    <div className="stat">
                      <strong>{designer.projects}</strong>
                      <span>Projects</span>
                    </div>
                    <div className="stat">
                      <strong>{designer.experience}</strong>
                      <span>Experience</span>
                    </div>
                    <div className="stat">
                      <strong>{designer.category}</strong>
                      <span>Specialty</span>
                    </div>
                  </div>
                  <div className="designer-actions">
                    <button className="contact-btn">Contact Designer</button>
                    <button className="profile-btn">View Profile</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Can't find the right designer?</h2>
            <p>Let our Ez-ID Guide help you find the perfect match for your project.</p>
            <button className="cta-btn">Get Personalized Recommendations</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrowseDesigners;


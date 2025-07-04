import React, { useState, useEffect } from 'react';
import './DesignIdeas.css';

const DesignIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    room: 'all'
  });

  const categories = ['all', 'modern', 'scandinavian', 'industrial', 'minimalist', 'contemporary', 'traditional'];
  const rooms = ['all', 'livingroom', 'bedroom', 'kitchen', 'bathroom', 'diningroom', 'homeoffice', 'studyroom'];

  useEffect(() => {
    fetchIdeas();
  }, []);

  useEffect(() => {
    filterIdeas();
  }, [ideas, filters]);

  const fetchIdeas = async () => {
    try {
      const response = await fetch('/api/content/public/design-ideas');
      if (response.ok) {
        const data = await response.json();
        setIdeas(data);
      }
    } catch (error) {
      console.error('Error fetching design ideas:', error);
      // Fallback to static data if API fails
      setIdeas(getStaticIdeas());
    } finally {
      setLoading(false);
    }
  };

  const filterIdeas = () => {
    let filtered = ideas;

    if (filters.category !== 'all') {
      filtered = filtered.filter(idea => 
        idea.category.toLowerCase() === filters.category
      );
    }

    if (filters.room !== 'all') {
      filtered = filtered.filter(idea => 
        idea.room.toLowerCase() === filters.room
      );
    }

    setFilteredIdeas(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getStaticIdeas = () => [
    {
      id: 1,
      title: "Modern Living Room with Red Accents",
      category: "modern",
      room: "livingroom",
      image: "/hero_interior.png",
      description: "A contemporary living space featuring clean lines and bold red accent pieces.",
      likes: 245,
      saves: 89,
      designer: "Design Studio Alpha"
    },
    {
      id: 2,
      title: "Scandinavian Bedroom Retreat",
      category: "scandinavian",
      room: "bedroom",
      image: "/hero_interior.png",
      description: "Cozy bedroom with natural materials and minimalist Scandinavian design.",
      likes: 189,
      saves: 67,
      designer: "Nordic Home Design"
    },
    {
      id: 3,
      title: "Industrial Kitchen Design",
      category: "industrial",
      room: "kitchen",
      image: "/hero_interior.png",
      description: "Modern kitchen with exposed brick walls and industrial fixtures.",
      likes: 156,
      saves: 45,
      designer: "Urban Loft Interiors"
    },
    {
      id: 4,
      title: "Minimalist Home Office",
      category: "minimalist",
      room: "homeoffice",
      image: "/hero_interior.png",
      description: "Clean and organized workspace promoting productivity and focus.",
      likes: 134,
      saves: 78,
      designer: "Zen Living Spaces"
    },
    {
      id: 5,
      title: "Contemporary Dining Room",
      category: "contemporary",
      room: "diningroom",
      image: "/hero_interior.png",
      description: "Elegant dining space perfect for entertaining guests.",
      likes: 198,
      saves: 56,
      designer: "Contemporary Creations"
    },
    {
      id: 6,
      title: "Luxury Bathroom Design",
      category: "modern",
      room: "bathroom",
      image: "/hero_interior.png",
      description: "Spa-like bathroom with premium finishes and modern fixtures.",
      likes: 167,
      saves: 92,
      designer: "Elegant Interiors Co."
    }
  ];

  const formatRoomName = (room) => {
    const roomMap = {
      'livingroom': 'Living Room',
      'bedroom': 'Bedroom',
      'kitchen': 'Kitchen',
      'bathroom': 'Bathroom',
      'diningroom': 'Dining Room',
      'homeoffice': 'Home Office',
      'studyroom': 'Study Room'
    };
    return roomMap[room] || room;
  };

  if (loading) {
    return (
      <div className="page-hero">
        <div className="hero-content">
          <h1>Loading design ideas...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="design-ideas">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-content">
          <h1>Design Ideas & Inspiration</h1>
          <p>Explore stunning interior design ideas to transform your space with style and creativity.</p>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <div className="container">
          <h2>Featured Design Ideas</h2>
          <div className="featured-grid">
            {filteredIdeas.slice(0, 3).map(idea => (
              <div key={idea.id} className="featured-card">
                <div className="featured-image">
                  <img src={idea.image || "/hero_interior.png"} alt={idea.title} />
                  <div className="featured-overlay">
                    <div className="featured-stats">
                      <span>❤️ {idea.likes}</span>
                      <span>📌 {idea.saves}</span>
                    </div>
                  </div>
                </div>
                <div className="featured-info">
                  <h3>{idea.title}</h3>
                  <p>{idea.description}</p>
                  <div className="featured-meta">
                    <span className="category">{idea.category}</span>
                    <span className="room">{formatRoomName(idea.room)}</span>
                  </div>
                  {idea.designer && (
                    <div className="designer-credit">
                      By {idea.designer}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
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
              <label>Room:</label>
              <select 
                value={filters.room} 
                onChange={(e) => handleFilterChange('room', e.target.value)}
              >
                {rooms.map(room => (
                  <option key={room} value={room}>
                    {room === 'all' ? 'All Rooms' : formatRoomName(room)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="results-count">
            {filteredIdeas.length} ideas found
          </div>
        </div>
      </section>

      {/* Ideas Grid */}
      <section className="ideas-grid">
        <div className="container">
          <div className="grid">
            {filteredIdeas.map(idea => (
              <div key={idea.id} className="idea-card">
                <div className="idea-image">
                  <img src={idea.image || "/hero_interior.png"} alt={idea.title} />
                  <div className="image-overlay">
                    <div className="idea-stats">
                      <span>❤️ {idea.likes}</span>
                      <span>📌 {idea.saves}</span>
                    </div>
                    <button className="save-btn">Save Idea</button>
                  </div>
                </div>
                <div className="idea-info">
                  <h3>{idea.title}</h3>
                  <p>{idea.description}</p>
                  <div className="idea-meta">
                    <span className="category">{idea.category}</span>
                    <span className="room">{formatRoomName(idea.room)}</span>
                  </div>
                  {idea.designer && (
                    <div className="designer-credit">
                      By {idea.designer}
                    </div>
                  )}
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
            <h2>Ready to bring these ideas to life?</h2>
            <p>Connect with our talented designers to make your dream space a reality.</p>
            <button className="cta-btn">Find a Designer</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignIdeas;


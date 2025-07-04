import React, { useState, useEffect } from 'react';
import './Articles.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'designtips', 'trends', 'renovation', 'budget', 'guides'];

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, searchTerm, selectedCategory]);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/content/public/articles');
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      // Fallback to static data if API fails
      setArticles(getStaticArticles());
    } finally {
      setLoading(false);
    }
  };

  const filterArticles = () => {
    let filtered = articles;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => 
        article.category.toLowerCase() === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  };

  const getStaticArticles = () => [
    {
      id: 1,
      title: "10 Essential Interior Design Tips for Small Spaces",
      category: "designtips",
      author: "Sarah Chen",
      date: "2024-01-15",
      read_time: "5 min read",
      image: "/hero_interior.png",
      excerpt: "Maximize your small space with these proven interior design strategies that create the illusion of more room.",
      tags: "small spaces, design tips, organization"
    },
    {
      id: 2,
      title: "2024 Interior Design Trends: What's Hot This Year",
      category: "trends",
      author: "Michael Wong",
      date: "2024-01-10",
      read_time: "7 min read",
      image: "/hero_interior.png",
      excerpt: "Discover the latest interior design trends that are shaping homes in 2024, from color palettes to furniture styles.",
      tags: "trends, 2024, modern design"
    },
    {
      id: 3,
      title: "Complete Guide to Home Renovation Planning",
      category: "renovation",
      author: "Lisa Tan",
      date: "2024-01-05",
      read_time: "12 min read",
      image: "/hero_interior.png",
      excerpt: "Everything you need to know about planning a successful home renovation, from budgeting to timeline management.",
      tags: "renovation, planning, home improvement"
    },
    {
      id: 4,
      title: "Budget-Friendly Ways to Refresh Your Living Room",
      category: "budget",
      author: "David Lim",
      date: "2023-12-28",
      read_time: "6 min read",
      image: "/hero_interior.png",
      excerpt: "Transform your living room without breaking the bank using these creative and affordable design solutions.",
      tags: "budget, living room, affordable design"
    },
    {
      id: 5,
      title: "How to Choose the Perfect Color Scheme",
      category: "guides",
      author: "Sarah Chen",
      date: "2023-12-20",
      read_time: "8 min read",
      image: "/hero_interior.png",
      excerpt: "Master the art of color selection with this comprehensive guide to creating harmonious color schemes.",
      tags: "color theory, design guide, color schemes"
    },
    {
      id: 6,
      title: "Sustainable Interior Design: Eco-Friendly Choices",
      category: "trends",
      author: "Michael Wong",
      date: "2023-12-15",
      read_time: "9 min read",
      image: "/hero_interior.png",
      excerpt: "Learn how to create beautiful interiors while making environmentally conscious design choices.",
      tags: "sustainability, eco-friendly, green design"
    }
  ];

  const formatCategoryName = (category) => {
    const categoryMap = {
      'designtips': 'Design Tips',
      'trends': 'Trends',
      'renovation': 'Renovation',
      'budget': 'Budget',
      'guides': 'Guides'
    };
    return categoryMap[category] || category;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="page-hero">
        <div className="hero-content">
          <h1>Loading articles...</h1>
        </div>
      </div>
    );
  }

  const featuredArticle = filteredArticles[0];

  return (
    <div className="articles">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-content">
          <h1>Interior Design Articles</h1>
          <p>Expert insights, tips, and inspiration for your interior design journey.</p>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="featured-article">
          <div className="container">
            <div className="featured-content">
              <div className="featured-image">
                <img src={featuredArticle.image || "/hero_interior.png"} alt={featuredArticle.title} />
              </div>
              <div className="featured-info">
                <div className="article-meta">
                  <span className="category">{formatCategoryName(featuredArticle.category)}</span>
                  <span className="date">{formatDate(featuredArticle.date)}</span>
                  <span className="read-time">{featuredArticle.read_time}</span>
                </div>
                <h2>{featuredArticle.title}</h2>
                <p>{featuredArticle.excerpt}</p>
                <div className="article-author">
                  <span>By {featuredArticle.author}</span>
                </div>
                <button className="read-more-btn">Read Full Article</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="search-filter">
        <div className="container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div>
          <div className="category-filter">
            <label>Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : formatCategoryName(category)}
                </option>
              ))}
            </select>
          </div>
          <div className="results-count">
            {filteredArticles.length} articles found
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="articles-grid">
        <div className="container">
          <div className="grid">
            {filteredArticles.slice(1).map(article => (
              <article key={article.id} className="article-card">
                <div className="article-image">
                  <img src={article.image || "/hero_interior.png"} alt={article.title} />
                  <div className="image-overlay">
                    <span className="category-tag">{formatCategoryName(article.category)}</span>
                  </div>
                </div>
                <div className="article-content">
                  <div className="article-meta">
                    <span className="date">{formatDate(article.date)}</span>
                    <span className="read-time">{article.read_time}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="article-footer">
                    <div className="author">
                      <span>By {article.author}</span>
                    </div>
                    <button className="read-btn">Read More</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="newsletter-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Stay Updated with Design Insights</h2>
            <p>Subscribe to our newsletter for the latest interior design tips, trends, and inspiration.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button className="subscribe-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Articles;


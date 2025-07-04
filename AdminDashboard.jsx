import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ContentManager from './ContentManager';
import DesignerManager from './DesignerManager';
import ArticleManager from './ArticleManager';
import DesignIdeaManager from './DesignIdeaManager';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('content');
  const { user, logout } = useAuth();

  const tabs = [
    { id: 'content', label: 'Page Content', icon: '📝' },
    { id: 'designers', label: 'Designers', icon: '👨‍🎨' },
    { id: 'ideas', label: 'Design Ideas', icon: '💡' },
    { id: 'articles', label: 'Articles', icon: '📰' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'content':
        return <ContentManager />;
      case 'designers':
        return <DesignerManager />;
      case 'ideas':
        return <DesignIdeaManager />;
      case 'articles':
        return <ArticleManager />;
      default:
        return <ContentManager />;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="header-left">
          <img src="/ez_id_logo.png" alt="Ez-ID Logo" className="admin-logo" />
          <h1>Ez-ID Admin Panel</h1>
        </div>
        <div className="header-right">
          <span className="welcome-text">Welcome, {user?.username}</span>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="admin-nav">
        <div className="nav-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-content">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;


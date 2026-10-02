import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { dsaSheetData } from '../data/dsaSheetData';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const TOTAL_TOPICS = 16;
  const TOTAL_PROBLEMS = dsaSheetData.length;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProtectedProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/profile', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setProfileData(response.data.user);
      } catch (error) {
        console.error("Error fetching protected data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProtectedProfile();
  }, [user, navigate]);

  if (!user) return null;

  const completedTopicsCount = profileData?.completedTopics?.length || 0;
  const topicsPercentage = Math.min(100, Math.round((completedTopicsCount / TOTAL_TOPICS) * 100));

  const solvedProblemsCount = profileData?.completedProblems?.length || 0;
  const problemsPercentage = TOTAL_PROBLEMS > 0 ? Math.min(100, Math.round((solvedProblemsCount / TOTAL_PROBLEMS) * 100)) : 0;

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.email.split('@')[0]}! 👋</h1>
      
      {/* Account Details Card */}
      <div className="dashboard-card" style={{ marginBottom: '2rem' }}>
        <h2>Your Account Details</h2>
        
        <div className="detail-row">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{user.email}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Account ID:</span>
          <span className="detail-value">{user._id}</span>
        </div>

        {profileData && (
          <div className="detail-row">
            <span className="detail-label">Member Since:</span>
            <span className="detail-value">
              {new Date(profileData.createdAt).toLocaleDateString(undefined, { 
                year: 'numeric', month: 'long', day: 'numeric' 
              })}
            </span>
          </div>
        )}
        
        <div className="dashboard-actions">
          <Link to="/sheet" className="auth-button" style={{textDecoration: 'none', display: 'inline-block'}}>
            📝 Practice DSA Sheet
          </Link>
          <Link to="/algorithms" className="auth-button" style={{background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)', textDecoration: 'none', display: 'inline-block'}}>
            Explore Algorithms
          </Link>
          <Link to="/data-structures" className="auth-button" style={{background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)', textDecoration: 'none', display: 'inline-block'}}>
            Review Data Structures
          </Link>
        </div>
      </div>

      {/* DSA Problem Sheet Record Card */}
      <div className="dashboard-card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <h2>DSA Sheet Problem Tracker</h2>
          <Link to="/sheet" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem' }}>
            Open Sheet →
          </Link>
        </div>

        {loading ? (
          <p>Loading problem records...</p>
        ) : profileData ? (
          <>
            <div className="progress-stats">
              <span className="progress-count">{solvedProblemsCount} of {TOTAL_PROBLEMS} Problems Solved</span>
              <span className="progress-percent">{problemsPercentage}%</span>
            </div>
            <div className="progress-bar-container" style={{ width: '100%', height: '12px', background: 'var(--border)', borderRadius: '6px', overflow: 'hidden', margin: '1rem 0' }}>
              <div 
                className="progress-bar-fill" 
                style={{ width: `${problemsPercentage}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)', transition: 'width 0.5s ease-out' }}
              ></div>
            </div>
            <p style={{ color: 'var(--text)', fontSize: '0.9rem', margin: 0 }}>
              Track interview-ready coding problems across Arrays, Strings, Trees, Graphs, and DP. All progress synced to MongoDB.
            </p>
          </>
        ) : (
          <p style={{color: 'red'}}>Could not load problem records.</p>
        )}
      </div>

      {/* Conceptual Topics Progress Card */}
      <div className="dashboard-card">
        <h2>Concept Learning Progress</h2>
        {loading ? (
          <p>Loading concept progress...</p>
        ) : profileData ? (
          <>
            <div className="progress-stats">
              <span className="progress-count">{completedTopicsCount} Topics Completed</span>
              <span className="progress-percent">{topicsPercentage}%</span>
            </div>
            <div className="progress-bar-container" style={{ width: '100%', height: '12px', background: 'var(--border)', borderRadius: '6px', overflow: 'hidden', margin: '1rem 0' }}>
              <div 
                className="progress-bar-fill" 
                style={{ width: `${topicsPercentage}%`, height: '100%', background: '#10b981', transition: 'width 0.5s ease-out' }}
              ></div>
            </div>
            
            {completedTopicsCount > 0 ? (
              <div className="completed-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1rem' }}>
                {profileData.completedTopics.map(topic => (
                  <span key={topic} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#059669', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600', textTransform: 'capitalize' }}>
                    {topic}
                  </span>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text)', fontSize: '0.9rem', marginTop: '1rem' }}>You haven't marked any conceptual topics as completed yet.</p>
            )}
          </>
        ) : (
          <p style={{color: 'red'}}>Could not load progress.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

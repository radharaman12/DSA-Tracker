import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="home-badge">
          {user ? '✨ Welcome Back' : '🚀 Master DSA with Real-Time Visuals'}
        </div>
        <h1>Algorithms, Data Structures & Problem Sheet</h1>
        <p>
          Understand complex concepts through interactive visualizers, and practice 100 curated
          interview problems across all core DSA topics with MongoDB cloud progress tracking.
        </p>

        {user ? (
          <div className="home-cta-group">
            <Link to="/sheet" className="home-cta">
              Practice DSA Sheet →
            </Link>
            <Link to="/dashboard" className="home-cta-secondary">
              Go to Dashboard
            </Link>
            <Link to="/algorithms" className="home-cta-secondary">
              Visualizer
            </Link>
          </div>
        ) : (
          <div className="home-cta-group">
            <Link to="/register" className="home-cta">
              Get Started Free →
            </Link>
            <Link to="/login" className="home-cta-secondary">
              Sign In to Your Account
            </Link>
          </div>
        )}

        {!user && (
          <p className="home-lock-notice">
            🔒 <strong>Authentication Required:</strong> Sign up or log in to unlock full access to the Problem Sheet, Data Structures, and Algorithm visualizers.
          </p>
        )}
      </div>

      <div className="home-features">
        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3>Curated DSA Sheet</h3>
          <p>
            Topic-wise interview problems with difficulty ratings (Easy, Medium, Hard), direct LeetCode links,
            and one-click checkboxes that save your progress permanently.
          </p>
          {!user && <span className="feature-lock">Sign in to access ➔</span>}
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Data Structure Sandbox</h3>
          <p>
            Interactive operations on Arrays, Linked Lists, Stacks, Queues, Trees, and Graphs.
            Visualize insertions, deletions, searches, and shifts dynamically.
          </p>
          {!user && <span className="feature-lock">Sign in to access ➔</span>}
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Step-by-Step Algorithms</h3>
          <p>
            Watch sorting and searching algorithms step-by-step with synchronized line-by-line
            code tracking in Java, C++, and Pseudocode.
          </p>
          {!user && <span className="feature-lock">Sign in to access ➔</span>}
        </div>

        </div>

      <div className="home-curriculum-preview">
        <h2>What You'll Learn & Track</h2>
        <div className="curriculum-grid">
          <div className="curriculum-item">
            <h4>📦 Data Structures</h4>
            <ul>
              <li>Arrays (Insert, Delete, Search, Shift)</li>
              <li>Linked Lists (Singly & Doubly)</li>
              <li>Stacks & Queues (LIFO & FIFO)</li>
              <li>Binary Trees & Traversals</li>
              <li>Graphs & Network Search</li>
            </ul>
          </div>
          <div className="curriculum-item">
            <h4>⚙️ Algorithms</h4>
            <ul>
              <li>Bubble Sort & Selection Sort</li>
              <li>Insertion Sort & Merge Sort</li>
              <li>Quick Sort & Heap Sort</li>
              <li>Linear & Binary Search</li>
              <li>Graph BFS & DFS</li>
            </ul>
          </div>
          <div className="curriculum-item">
            <h4>📝 Curated DSA Sheet</h4>
            <ul>
              <li>Topic-wise LeetCode problems</li>
              <li>Easy, Medium, and Hard tags</li>
              <li>One-click solved checkbox</li>
              <li>Direct link to visualizers</li>
              <li>Saved permanently to MongoDB</li>
            </ul>
          </div>
        </div>

        {!user && (
          <div className="curriculum-cta-box">
            <h3>Ready to start your DSA journey?</h3>
            <p>Create your free account now and start tracking your problem sheet.</p>
            <Link to="/register" className="home-cta">
              Create Free Account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

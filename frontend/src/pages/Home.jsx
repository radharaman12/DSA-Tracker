import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Algorithms Made Visual</h1>
        <p>
          Master Data Structures and Algorithms with fully interactive animations, 
          step-by-step breakdowns, and real-time performance analytics.
        </p>
        <Link to="/algorithms" className="home-cta">
          Start Exploring
        </Link>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <h3>Interactive Visuals</h3>
          <p>Watch arrays transform in real-time as sorting and searching algorithms execute step-by-step.</p>
        </div>
        <div className="feature-card">
          <h3>Code Tracking</h3>
          <p>Follow the logic with synchronized line-by-line highlighting in Java, C++, and Pseudocode.</p>
        </div>
        <div className="feature-card">
          <h3>Live Analytics</h3>
          <p>Monitor time complexity, variable states, comparisons, and swaps on the fly.</p>
        </div>
      </div>
    </div>
  );
}

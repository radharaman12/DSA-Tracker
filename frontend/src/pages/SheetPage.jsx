import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { dsaSheetData, sheetTopics } from '../data/dsaSheetData';
import './SheetPage.css';

export default function SheetPage() {
  const { user } = useContext(AuthContext);
  const [completedProblems, setCompletedProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [togglingId, setTogglingId] = useState(null);

  // Fetch initial solved status from MongoDB via profile
  useEffect(() => {
    if (!user) return;

    const fetchSolvedData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}` + '/api/profile', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCompletedProblems(res.data.user.completedProblems || []);
      } catch (err) {
        console.error('Failed to load problem progress', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSolvedData();
  }, [user]);

  // Toggle problem solved status in MongoDB
  const toggleProblem = async (problemId) => {
    if (!user) return;
    setTogglingId(problemId);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}` + '/api/problems/toggle',
        { problemId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCompletedProblems(res.data.completedProblems || []);
    } catch (err) {
      console.error('Failed to toggle problem', err);
    } finally {
      setTogglingId(null);
    }
  };

  // Filter problems based on search and filters
  const filteredProblems = dsaSheetData.filter((prob) => {
    const matchesTopic = selectedTopic === 'All' || prob.topic === selectedTopic;
    const matchesDifficulty = selectedDifficulty === 'All' || prob.difficulty === selectedDifficulty;
    const isSolved = completedProblems.includes(prob.id);
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Solved' && isSolved) ||
      (statusFilter === 'Unsolved' && !isSolved);
    const matchesSearch =
      prob.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.topic.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTopic && matchesDifficulty && matchesStatus && matchesSearch;
  });

  // Calculate metrics
  const totalProblems = dsaSheetData.length;
  const totalSolved = completedProblems.length;
  const progressPercent = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

  const easyTotal = dsaSheetData.filter((p) => p.difficulty === 'Easy').length;
  const easySolved = dsaSheetData.filter((p) => p.difficulty === 'Easy' && completedProblems.includes(p.id)).length;

  const medTotal = dsaSheetData.filter((p) => p.difficulty === 'Medium').length;
  const medSolved = dsaSheetData.filter((p) => p.difficulty === 'Medium' && completedProblems.includes(p.id)).length;

  const hardTotal = dsaSheetData.filter((p) => p.difficulty === 'Hard').length;
  const hardSolved = dsaSheetData.filter((p) => p.difficulty === 'Hard' && completedProblems.includes(p.id)).length;

  return (
    <div className="sheet-page-container">
      {/* Header Banner */}
      <div className="sheet-header">
        <div className="sheet-badge">📚 Curated Problem Sheet</div>
        <h1>Topic-Wise DSA Problems</h1>
        <p>
          Practice essential problems hand-picked for technical interviews. Check off problems as you solve
          them—your record is saved permanently to MongoDB!
        </p>
      </div>

      {/* Progress Card */}
      <div className="sheet-progress-card">
        <div className="sheet-progress-top">
          <div>
            <h3>Overall Progress</h3>
            <span className="sheet-progress-ratio">
              {totalSolved} / {totalProblems} Solved ({progressPercent}%)
            </span>
          </div>
          <div className="difficulty-pills">
            <span className="pill pill-easy">
              Easy: {easySolved}/{easyTotal}
            </span>
            <span className="pill pill-med">
              Medium: {medSolved}/{medTotal}
            </span>
            <span className="pill pill-hard">
              Hard: {hardSolved}/{hardTotal}
            </span>
          </div>
        </div>

        <div className="sheet-progress-bar-bg">
          <div
            className="sheet-progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Controls & Filter Bar */}
      <div className="sheet-controls">
        {/* Search */}
        <div className="sheet-search">
          <input
            type="text"
            placeholder="🔍 Search problems by name or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Dropdown Filters */}
        <div className="sheet-filters-group">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="sheet-filter-select"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="sheet-filter-select"
          >
            <option value="All">All Statuses</option>
            <option value="Solved">Solved Only</option>
            <option value="Unsolved">Unsolved Only</option>
          </select>
        </div>
      </div>

      {/* Topic Tabs */}
      <div className="topic-tabs-scroll">
        <div className="topic-tabs">
          {sheetTopics.map((topic) => {
            const topicTotal =
              topic === 'All'
                ? totalProblems
                : dsaSheetData.filter((p) => p.topic === topic).length;
            const topicSolved =
              topic === 'All'
                ? totalSolved
                : dsaSheetData.filter((p) => p.topic === topic && completedProblems.includes(p.id)).length;

            return (
              <button
                key={topic}
                className={`topic-tab-btn ${selectedTopic === topic ? 'active' : ''}`}
                onClick={() => setSelectedTopic(topic)}
              >
                <span>{topic}</span>
                <span className="topic-tab-count">
                  {topicSolved}/{topicTotal}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Problems Table / List */}
      <div className="sheet-table-wrapper">
        {loading ? (
          <div className="sheet-loading">Loading your problem records...</div>
        ) : filteredProblems.length === 0 ? (
          <div className="sheet-empty">
            <p>No problems match the current filter.</p>
            <button
              onClick={() => {
                setSelectedTopic('All');
                setSelectedDifficulty('All');
                setStatusFilter('All');
                setSearchQuery('');
              }}
              className="sheet-reset-btn"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <table className="sheet-table">
            <thead>
              <tr>
                <th style={{ width: '60px', textAlign: 'center' }}>Status</th>
                <th>Problem</th>
                <th style={{ width: '150px' }}>Topic</th>
                <th style={{ width: '110px' }}>Difficulty</th>
                <th style={{ width: '170px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map((prob) => {
                const isSolved = completedProblems.includes(prob.id);
                const isToggling = togglingId === prob.id;

                return (
                  <tr key={prob.id} className={isSolved ? 'row-solved' : ''}>
                    {/* Status Checkbox */}
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className={`status-check-btn ${isSolved ? 'solved' : ''}`}
                        onClick={() => toggleProblem(prob.id)}
                        disabled={isToggling}
                        title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}
                      >
                        {isToggling ? '⏳' : isSolved ? '✓' : ''}
                      </button>
                    </td>

                    {/* Problem Name */}
                    <td>
                      <span className={`problem-title ${isSolved ? 'title-solved' : ''}`}>
                        {prob.title}
                      </span>
                    </td>

                    {/* Topic */}
                    <td>
                      <span className="topic-badge">{prob.topic}</span>
                    </td>

                    {/* Difficulty */}
                    <td>
                      <span
                        className={`diff-badge diff-${prob.difficulty.toLowerCase()}`}
                      >
                        {prob.difficulty}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ textAlign: 'right' }}>
                      <div className="action-links">
                        {prob.practiceUrl && (
                          <a
                            href={prob.practiceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-btn-practice"
                            title="Solve on LeetCode"
                          >
                            Practice ↗
                          </a>
                        )}
                        
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

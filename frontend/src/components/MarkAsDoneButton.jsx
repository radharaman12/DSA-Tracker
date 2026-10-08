import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './MarkAsDoneButton.css';

const MarkAsDoneButton = ({ topicId, topicName }) => {
  const { user } = useContext(AuthContext);
  const [isDone, setIsDone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    
    // Check initial status by fetching profile
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}` + '/api/profile', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const completed = res.data.user.completedTopics || [];
        setIsDone(completed.includes(topicId));
      } catch (err) {
        console.error("Failed to fetch status");
      }
    };
    fetchStatus();
  }, [user, topicId]);

  const toggleDone = async () => {
    if (!user) {
      alert("Please log in to save your progress!");
      return;
    }
    
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}` + '/api/progress', 
        { topicId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      
      const completed = res.data.completedTopics || [];
      setIsDone(completed.includes(topicId));
    } catch (err) {
      console.error("Failed to update progress");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <button 
      className={`mark-done-btn ${isDone ? 'done' : ''}`}
      onClick={toggleDone}
      disabled={loading}
      title={isDone ? `Unmark ${topicName}` : `Mark ${topicName} as Done`}
    >
      {isDone ? '✅ Completed' : '⬜ Mark as Done'}
    </button>
  );
};

export default MarkAsDoneButton;

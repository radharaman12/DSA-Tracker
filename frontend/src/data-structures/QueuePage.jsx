import MarkAsDoneButton from '../components/MarkAsDoneButton';
import { useState, useRef, useEffect } from 'react';
import './QueuePage.css';

const MAX_SIZE = 8;

export default function QueuePage() {
  const [queue, setQueue] = useState([10, 20, 30]);
  const [valInput, setValInput] = useState('');
  const [logs, setLogs] = useState(['Welcome! Select a Queue operation.']);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const logEndRef = useRef(null);
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (msg) => setLogs((prev) => [...prev, msg]);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleEnqueue = async () => {
    const val = parseInt(valInput);
    if (isNaN(val)) return setLogs(['Error: Please enter a valid Value.']);
    if (queue.length >= MAX_SIZE) return setLogs([`Error: Queue is full (Max ${MAX_SIZE}).`]);

    setIsAnimating(true);
    setLogs([`--- Starting Enqueue Operation ---`]);
    addLog(`Creating new element [${val}]...`);
    await sleep(800);

    let newQueue = [...queue, val];
    setQueue(newQueue);
    setActiveIndex(newQueue.length - 1);
    
    addLog(`Enqueued [${val}] to the Rear of the queue.`);
    await sleep(1000);

    setActiveIndex(null);
    addLog(`--- Enqueue Complete. Queue size is now ${newQueue.length} ---`);
    setIsAnimating(false);
  };

  const handleDequeue = async () => {
    if (queue.length === 0) {
      setLogs(['Error: Queue is empty.']);
      return;
    }

    setIsAnimating(true);
    setLogs([`--- Starting Dequeue Operation ---`]);
    setActiveIndex(0);
    addLog(`Identifying the Front element: [${queue[0]}].`);
    await sleep(1000);

    addLog(`Removing [${queue[0]}] from the Front of the queue...`);
    let newQueue = queue.slice(1);
    setQueue(newQueue);
    
    await sleep(800);
    setActiveIndex(null);
    addLog(`--- Dequeue Complete. Queue size is now ${newQueue.length} ---`);
    setIsAnimating(false);
  };

  const handlePeek = async () => {
    if (queue.length === 0) {
      setLogs(['Error: Queue is empty.']);
      return;
    }

    setIsAnimating(true);
    setLogs([`--- Starting Peek Operation ---`]);
    setActiveIndex(0);
    addLog(`Reading the Front element...`);
    await sleep(1000);

    addLog(`The Front element is [${queue[0]}]. The queue is unmodified.`);
    await sleep(800);
    setActiveIndex(null);
    addLog(`--- Peek Complete ---`);
    setIsAnimating(false);
  };

  const handleClear = () => {
    setQueue([]);
    setLogs(['Queue cleared.']);
    setActiveIndex(null);
    setValInput('');
  };

  return (
    <div className="ds-container">
      <div className="ds-header">
        <h2>Queue (FIFO)</h2>
        <p>Visualize First-In-First-Out operations.</p>
      </div>

      <div className="theory-box" style={{ background: 'var(--bg)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '2rem' }}>
        <h3 style={{ marginTop: 0, color: 'var(--text-h)' }}>Queue Theory</h3>
        <p style={{ color: 'var(--text)', lineHeight: '1.6' }}>A queue is a linear data structure that follows the First In, First Out (FIFO) principle. Elements are added at the rear and removed from the front.</p>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', fontSize: '0.9rem' }}>
          <div><strong style={{color: 'var(--text-h)'}}>Time Complexity:</strong> <span style={{color: 'var(--text)'}}> Enqueue: O(1) | Dequeue: O(1) | Front: O(1) </span></div>
          <div><strong style={{color: 'var(--text-h)'}}>Space Complexity:</strong> <span style={{color: 'var(--text)'}}> O(n) </span></div>
        </div>
      </div>


      <div className="ds-visualizer queue-visualizer">
        <div className="queue-container">
          <div className="queue-label front-label">Front</div>
          <div className="queue-track">
            {queue.length === 0 && <div className="queue-empty">Empty Queue</div>}
            {queue.map((val, idx) => (
              <div 
                key={idx} 
                className={`queue-cell ${activeIndex === idx ? 'active' : ''}`}
              >
                {val}
              </div>
            ))}
          </div>
          <div className="queue-label rear-label">Rear</div>
        </div>
      </div>

      <div className="ds-controls-box">
        <div className="inputs-row">
          <div className="input-group">
            <label>Value</label>
            <input 
              type="number" 
              value={valInput} 
              onChange={(e) => setValInput(e.target.value)} 
              disabled={isAnimating}
              placeholder="e.g. 20"
            />
          </div>
        </div>
        <div className="buttons-row">
          <button onClick={handleEnqueue} disabled={isAnimating}>Enqueue</button>
          <button onClick={handleDequeue} disabled={isAnimating} className="btn-danger">Dequeue</button>
          <button onClick={handlePeek} disabled={isAnimating} className="btn-secondary">Peek</button>
          <button onClick={handleClear} disabled={isAnimating} className="btn-secondary">Clear</button>
        </div>
      </div>

      <div className="ds-log-box">
        {logs.map((log, i) => (
          <div key={i} className="log-entry">{log}</div>
        ))}
        <div ref={logEndRef} />
      </div>
    
      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
        <MarkAsDoneButton topicId="queue" topicName="Queue" />
      </div>
    </div>
  );
}
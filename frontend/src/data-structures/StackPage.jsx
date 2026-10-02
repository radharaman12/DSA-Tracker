import MarkAsDoneButton from '../components/MarkAsDoneButton';
import { useState, useRef, useEffect } from 'react';
import './StackPage.css';

const MAX_SIZE = 8;

export default function StackPage() {
  const [stack, setStack] = useState([10, 20, 30]);
  const [valInput, setValInput] = useState('');
  const [logs, setLogs] = useState(['Welcome! Select a Stack operation.']);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const logEndRef = useRef(null);
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (msg) => setLogs((prev) => [...prev, msg]);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handlePush = async () => {
    const val = parseInt(valInput);
    if (isNaN(val)) return setLogs(['Error: Please enter a valid Value.']);
    if (stack.length >= MAX_SIZE) return setLogs([`Error: Stack Overflow (Max ${MAX_SIZE}).`]);

    setIsAnimating(true);
    setLogs([`--- Starting Push Operation ---`]);
    addLog(`Creating new element [${val}]...`);
    await sleep(800);

    let newStack = [...stack, val];
    setStack(newStack);
    setActiveIndex(newStack.length - 1);
    
    addLog(`Pushed [${val}] onto the top of the stack.`);
    await sleep(1000);

    setActiveIndex(null);
    addLog(`--- Push Complete. Stack size is now ${newStack.length} ---`);
    setIsAnimating(false);
  };

  const handlePop = async () => {
    if (stack.length === 0) {
      setLogs(['Error: Stack Underflow. Stack is empty.']);
      return;
    }

    setIsAnimating(true);
    setLogs([`--- Starting Pop Operation ---`]);
    const topIdx = stack.length - 1;
    setActiveIndex(topIdx);
    addLog(`Identifying the top element: [${stack[topIdx]}].`);
    await sleep(1000);

    addLog(`Removing [${stack[topIdx]}] from the stack...`);
    let newStack = stack.slice(0, -1);
    setStack(newStack);
    
    await sleep(800);
    setActiveIndex(null);
    addLog(`--- Pop Complete. Stack size is now ${newStack.length} ---`);
    setIsAnimating(false);
  };

  const handlePeek = async () => {
    if (stack.length === 0) {
      setLogs(['Error: Stack is empty.']);
      return;
    }

    setIsAnimating(true);
    setLogs([`--- Starting Peek Operation ---`]);
    const topIdx = stack.length - 1;
    setActiveIndex(topIdx);
    addLog(`Reading the top element...`);
    await sleep(1000);

    addLog(`The top element is [${stack[topIdx]}]. The stack is unmodified.`);
    await sleep(800);
    setActiveIndex(null);
    addLog(`--- Peek Complete ---`);
    setIsAnimating(false);
  };

  const handleClear = () => {
    setStack([]);
    setLogs(['Stack cleared.']);
    setActiveIndex(null);
    setValInput('');
  };

  return (
    <div className="ds-container">
      <div className="ds-header">
        <h2>Stack (LIFO)</h2>
        <p>Visualize Last-In-First-Out operations.</p>
      </div>

      <div className="theory-box" style={{ background: 'var(--bg)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '2rem' }}>
        <h3 style={{ marginTop: 0, color: 'var(--text-h)' }}>Stack Theory</h3>
        <p style={{ color: 'var(--text)', lineHeight: '1.6' }}>A stack is a linear data structure that follows the Last In, First Out (LIFO) principle. Elements can only be added or removed from the top of the stack.</p>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', fontSize: '0.9rem' }}>
          <div><strong style={{color: 'var(--text-h)'}}>Time Complexity:</strong> <span style={{color: 'var(--text)'}}> Push: O(1) | Pop: O(1) | Peek: O(1) </span></div>
          <div><strong style={{color: 'var(--text-h)'}}>Space Complexity:</strong> <span style={{color: 'var(--text)'}}> O(n) </span></div>
        </div>
      </div>


      <div className="ds-visualizer stack-visualizer">
        <div className="stack-container">
          {stack.length === 0 && <div className="stack-empty">Empty Stack</div>}
          {stack.slice().reverse().map((val, idx) => {
            const actualIdx = stack.length - 1 - idx;
            return (
              <div 
                key={actualIdx} 
                className={`stack-cell ${activeIndex === actualIdx ? 'active' : ''}`}
              >
                {val}
              </div>
            );
          })}
          <div className="stack-base"></div>
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
              placeholder="e.g. 10"
            />
          </div>
        </div>
        <div className="buttons-row">
          <button onClick={handlePush} disabled={isAnimating}>Push</button>
          <button onClick={handlePop} disabled={isAnimating} className="btn-danger">Pop</button>
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
        <MarkAsDoneButton topicId="stack" topicName="Stack" />
      </div>
    </div>
  );
}
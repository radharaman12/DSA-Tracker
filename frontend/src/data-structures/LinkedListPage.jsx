import MarkAsDoneButton from '../components/MarkAsDoneButton';
import { useState, useRef, useEffect } from 'react';
import './LinkedListPage.css';

const MAX_NODES = 8;
const DEFAULT_LIST = [
  { id: '1', val: 10 },
  { id: '2', val: 20 },
  { id: '3', val: 30 },
  { id: '4', val: 40 }
];

export default function LinkedListPage() {
  const [list, setList] = useState([...DEFAULT_LIST]);
  const [valInput, setValInput] = useState('');
  const [idxInput, setIdxInput] = useState('');
  const [logs, setLogs] = useState(['Welcome! Select a Linked List operation.']);
  const [activeIndices, setActiveIndices] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (msg) => setLogs((prev) => [...prev, msg]);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleInsert = async () => {
    const idx = parseInt(idxInput);
    const val = parseInt(valInput);
    if (isNaN(idx) || isNaN(val)) {
      setLogs(['Error: Please enter valid Value and Index.']);
      return;
    }
    if (list.length >= MAX_NODES) {
      setLogs([`Error: List is full (Max ${MAX_NODES} nodes).`]);
      return;
    }
    if (idx < 0 || idx > list.length) {
      setLogs([`Error: Index out of bounds (0 to ${list.length}).`]);
      return;
    }

    setIsAnimating(true);
    setLogs([`--- Starting Insertion of ${val} at index ${idx} ---`]);
    addLog(`Creating new node with value [${val}] in memory...`);
    await sleep(1000);

    // Traverse
    if (idx > 0) {
      addLog(`Traversing list from Head to find node at index ${idx - 1} (previous node)...`);
    }

    for (let i = 0; i < idx; i++) {
      setActiveIndices([i]);
      addLog(`Visiting node at index ${i}. (Value: ${list[i].val})`);
      await sleep(1000);
    }

    setActiveIndices([idx]);
    if (idx === 0) {
      addLog(`Inserting at Head. New node points to current Head.`);
    } else if (idx === list.length) {
      addLog(`Inserting at Tail. Previous node points to new node. New node points to null.`);
    } else {
      addLog(`Inserting in middle. Previous node (index ${idx - 1}) points to new node. New node points to next node.`);
    }
    
    let newList = [...list];
    newList.splice(idx, 0, { id: Date.now().toString(), val });
    setList(newList);
    
    await sleep(1000);

    setActiveIndices([]);
    addLog(`--- Successfully inserted node. List size is now ${list.length + 1} ---`);
    setIsAnimating(false);
  };

  const handleDelete = async () => {
    const idx = parseInt(idxInput);
    if (isNaN(idx)) {
      setLogs(['Error: Please enter a valid Index.']);
      return;
    }
    if (list.length === 0) {
      setLogs(['Error: Linked List is already empty.']);
      return;
    }
    if (idx < 0 || idx >= list.length) {
      setLogs([`Error: Index out of bounds (0 to ${list.length - 1}).`]);
      return;
    }

    setIsAnimating(true);
    setLogs([`--- Starting Deletion of node at index ${idx} ---`]);
    addLog(`Traversing list from Head to find target node and its previous node...`);
    await sleep(1000);

    // Traverse
    for (let i = 0; i <= idx; i++) {
      setActiveIndices([i]);
      if (i === idx) {
        addLog(`Target node found at index ${i}. (Value: ${list[i].val})`);
      } else {
        addLog(`Visiting node at index ${i}.`);
      }
      await sleep(1000);
    }

    if (idx === 0) {
      addLog(`Deleting Head node. Pointing Head reference to the next node.`);
    } else {
      addLog(`Adjusting pointer of previous node (index ${idx - 1}) to skip index ${idx} and point to the next node.`);
    }
    await sleep(1000);

    let newList = [...list];
    newList.splice(idx, 1);
    setList(newList);
    
    setActiveIndices([]);
    addLog(`--- Successfully deleted node. List size is now ${list.length - 1} ---`);
    setIsAnimating(false);
  };

  const handleUpdate = async () => {
    const idx = parseInt(idxInput);
    const val = parseInt(valInput);
    if (isNaN(idx) || isNaN(val)) {
      setLogs(['Error: Please enter valid Value and Index.']);
      return;
    }
    if (idx < 0 || idx >= list.length) {
      setLogs([`Error: Index out of bounds (0 to ${list.length - 1}).`]);
      return;
    }

    setIsAnimating(true);
    setLogs([`--- Starting Update of index ${idx} ---`]);
    addLog(`Traversing to target index ${idx}...`);
    await sleep(800);

    // Traverse
    for (let i = 0; i <= idx; i++) {
      setActiveIndices([i]);
      if (i < idx) addLog(`Visiting node at index ${i}...`);
      await sleep(800);
    }

    addLog(`Target reached. Replacing value [${list[idx].val}] with [${val}].`);
    let newList = [...list];
    newList[idx] = { ...newList[idx], val };
    setList(newList);
    
    await sleep(1000);
    setActiveIndices([]);
    addLog(`--- Successfully updated index ${idx} ---`);
    setIsAnimating(false);
  };

  const handleSearch = async () => {
    const val = parseInt(valInput);
    if (isNaN(val)) {
      setLogs(['Error: Please enter a valid Value to search.']);
      return;
    }

    setIsAnimating(true);
    setLogs([`--- Starting Linear Traversal to search for value ${val} ---`]);
    await sleep(800);

    for (let i = 0; i < list.length; i++) {
      setActiveIndices([i]);
      addLog(`Checking node at index ${i}: Is [${list[i].val}] == ${val}?`);
      await sleep(1000);
      
      if (list[i].val === val) {
        addLog(`Match found! Node with value [${val}] is located at index ${i}.`);
        addLog(`--- Search Successful ---`);
        setIsAnimating(false);
        return;
      } else {
        addLog(`No match. Following pointer to next node...`);
      }
    }

    setActiveIndices([]);
    addLog(`Reached End (null). Value [${val}] was not found in the list.`);
    addLog(`--- Search Failed ---`);
    setIsAnimating(false);
  };

  const handleReset = () => {
    setList([...DEFAULT_LIST]);
    setLogs(['Linked List reset to default state.']);
    setActiveIndices([]);
    setValInput('');
    setIdxInput('');
  };

  return (
    <div className="ll-page">
      <div className="ll-header">
        <h2>Linked List Operations</h2>
        <p>Visualize standard operations on a Singly Linked List via traversal.</p>
      </div>

      <div className="theory-box" style={{ background: 'var(--bg)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '2rem' }}>
        <h3 style={{ marginTop: 0, color: 'var(--text-h)' }}>Linked List Theory</h3>
        <p style={{ color: 'var(--text)', lineHeight: '1.6' }}>A linked list is a linear data structure where elements are not stored at contiguous memory locations. Instead, each element (node) points to the next.</p>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', fontSize: '0.9rem' }}>
          <div><strong style={{color: 'var(--text-h)'}}>Time Complexity:</strong> <span style={{color: 'var(--text)'}}> Access: O(n) | Search: O(n) | Insertion/Deletion (at known node): O(1) </span></div>
          <div><strong style={{color: 'var(--text-h)'}}>Space Complexity:</strong> <span style={{color: 'var(--text)'}}> O(n) </span></div>
        </div>
      </div>


      <div className="ll-visualizer">
        <div className="ll-head-label">Head</div>
        
        {list.map((node, i) => (
          <div key={node.id} className="ll-node-wrapper">
            <div className={`ll-node ${activeIndices.includes(i) ? 'active' : ''}`}>
              <div className="ll-val">{node.val}</div>
              <div className="ll-ptr">
                <div className="ll-ptr-dot"></div>
              </div>
            </div>
            
            <div className="ll-arrow">➔</div>
          </div>
        ))}
        
        <div className="ll-null-node">null</div>
      </div>

      <div className="ll-controls-box">
        <div className="inputs-row">
          <div className="input-group">
            <label>Value</label>
            <input 
              type="number" 
              value={valInput} 
              onChange={(e) => setValInput(e.target.value)} 
              disabled={isAnimating}
              placeholder="e.g. 99"
            />
          </div>
          <div className="input-group">
            <label>Index</label>
            <input 
              type="number" 
              value={idxInput} 
              onChange={(e) => setIdxInput(e.target.value)} 
              disabled={isAnimating}
              placeholder="0-7"
            />
          </div>
        </div>
        
        <div className="buttons-row">
          <button onClick={handleSearch} disabled={isAnimating}>Search (by Val)</button>
          <button onClick={handleInsert} disabled={isAnimating}>Insert</button>
          <button onClick={handleUpdate} disabled={isAnimating}>Update</button>
          <button onClick={handleDelete} disabled={isAnimating} className="btn-danger">Delete (by Idx)</button>
          <button onClick={handleReset} disabled={isAnimating} className="btn-secondary">Reset</button>
        </div>
      </div>

      <div className="ll-log-box">
        {logs.map((log, i) => (
          <div key={i} className="log-entry">{log}</div>
        ))}
        <div ref={logEndRef} />
      </div>
    
      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
        <MarkAsDoneButton topicId="linkedlist" topicName="LinkedList" />
      </div>
    </div>
  );
}
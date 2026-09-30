import { useState, useRef, useEffect } from 'react';
import './ArrayPage.css';

const CAPACITY = 10;
const DEFAULT_ARRAY = [15, 28, 32, 45, 50, null, null, null, null, null];

export default function ArrayPage() {
  const [array, setArray] = useState([...DEFAULT_ARRAY]);
  const [size, setSize] = useState(5);
  const [valInput, setValInput] = useState('');
  const [idxInput, setIdxInput] = useState('');
  const [logs, setLogs] = useState(['Welcome! Select an operation to visualize.']);
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
    if (size >= CAPACITY) {
      setLogs(['Error: Array is full (Capacity is 10). Cannot insert.']);
      return;
    }
    if (idx < 0 || idx > size) {
      setLogs([`Error: Index out of bounds (0 to ${size}).`]);
      return;
    }

    setIsAnimating(true);
    setLogs([`--- Starting Insertion of ${val} at index ${idx} ---`]);
    addLog(`Initial check: Array size is ${size}, Capacity is ${CAPACITY}. We have space.`);
    await sleep(800);

    let newArray = [...array];

    if (idx < size) {
      addLog(`Need to insert at index ${idx}. Shifting elements to the right to make space...`);
    }

    for (let i = size; i > idx; i--) {
      setActiveIndices([i, i - 1]);
      addLog(`Step: Shifting element [${newArray[i - 1]}] from index ${i - 1} right to index ${i}.`);
      newArray[i] = newArray[i - 1];
      setArray([...newArray]);
      await sleep(1000);
    }

    setActiveIndices([idx]);
    addLog(`Step: Space cleared. Inserting value [${val}] at index ${idx}.`);
    newArray[idx] = val;
    setArray([...newArray]);
    setSize((s) => s + 1);
    await sleep(1000);

    setActiveIndices([]);
    addLog(`--- Successfully inserted ${val}. New size is ${size + 1} ---`);
    setIsAnimating(false);
  };

  const handleDelete = async () => {
    const idx = parseInt(idxInput);
    if (isNaN(idx)) {
      setLogs(['Error: Please enter a valid Index.']);
      return;
    }
    if (size === 0) {
      setLogs(['Error: Array is already empty.']);
      return;
    }
    if (idx < 0 || idx >= size) {
      setLogs([`Error: Index out of bounds (0 to ${size - 1}).`]);
      return;
    }

    setIsAnimating(true);
    setLogs([`--- Starting Deletion of element at index ${idx} ---`]);
    setActiveIndices([idx]);
    addLog(`Target identified: Element [${array[idx]}] at index ${idx}.`);
    await sleep(800);

    let newArray = [...array];

    if (idx < size - 1) {
      addLog(`Need to fill the gap. Shifting subsequent elements to the left...`);
    }

    for (let i = idx; i < size - 1; i++) {
      setActiveIndices([i, i + 1]);
      addLog(`Step: Shifting element [${newArray[i + 1]}] from index ${i + 1} left to index ${i}.`);
      newArray[i] = newArray[i + 1];
      setArray([...newArray]);
      await sleep(1000);
    }

    setActiveIndices([size - 1]);
    addLog(`Step: Clearing the leftover duplicate element at the end (index ${size - 1}).`);
    newArray[size - 1] = null;
    setArray([...newArray]);
    setSize((s) => s - 1);
    await sleep(1000);

    setActiveIndices([]);
    addLog(`--- Successfully deleted element. New size is ${size - 1} ---`);
    setIsAnimating(false);
  };

  const handleUpdate = async () => {
    const idx = parseInt(idxInput);
    const val = parseInt(valInput);
    if (isNaN(idx) || isNaN(val)) {
      setLogs(['Error: Please enter valid Value and Index.']);
      return;
    }
    if (idx < 0 || idx >= size) {
      setLogs([`Error: Index out of bounds (0 to ${size - 1}).`]);
      return;
    }

    setIsAnimating(true);
    setLogs([`--- Starting Update of index ${idx} ---`]);
    setActiveIndices([idx]);
    addLog(`Accessing index ${idx}. Current value is [${array[idx]}].`);
    await sleep(1000);

    let newArray = [...array];
    addLog(`Step: Replacing [${newArray[idx]}] with new value [${val}].`);
    newArray[idx] = val;
    setArray([...newArray]);
    
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
    setLogs([`--- Starting Linear Search for value ${val} ---`]);
    addLog(`Traversing array from index 0 to ${size - 1}...`);
    await sleep(800);

    for (let i = 0; i < size; i++) {
      setActiveIndices([i]);
      addLog(`Checking index ${i}: Is [${array[i]}] == ${val}?`);
      await sleep(1000);
      
      if (array[i] === val) {
        addLog(`Match found! Element [${val}] is located at index ${i}.`);
        addLog(`--- Search Successful ---`);
        setIsAnimating(false);
        return;
      } else {
        addLog(`No match. Continuing to next element.`);
      }
    }

    setActiveIndices([]);
    addLog(`Reached end of array. Element [${val}] was not found.`);
    addLog(`--- Search Failed ---`);
    setIsAnimating(false);
  };

  const handleReset = () => {
    setArray([...DEFAULT_ARRAY]);
    setSize(5);
    setLogs(['Array reset to default state.']);
    setActiveIndices([]);
    setValInput('');
    setIdxInput('');
  };

  return (
    <div className="array-page">
      <div className="array-header">
        <h2>Array Operations</h2>
        <p>Visualize standard Data Structure operations on a fixed-capacity Array.</p>
      </div>

      <div className="array-visualizer">
        {array.map((val, i) => (
          <div 
            key={i} 
            className={`array-cell ${activeIndices.includes(i) ? 'active' : ''} ${i >= size ? 'empty' : ''}`}
          >
            <div className="array-val">{val !== null ? val : 'null'}</div>
            <div className="array-idx">{i}</div>
          </div>
        ))}
      </div>

      <div className="array-controls-box">
        <div className="inputs-row">
          <div className="input-group">
            <label>Value</label>
            <input 
              type="number" 
              value={valInput} 
              onChange={(e) => setValInput(e.target.value)} 
              disabled={isAnimating}
              placeholder="e.g. 42"
            />
          </div>
          <div className="input-group">
            <label>Index</label>
            <input 
              type="number" 
              value={idxInput} 
              onChange={(e) => setIdxInput(e.target.value)} 
              disabled={isAnimating}
              placeholder="0-9"
            />
          </div>
        </div>
        
        <div className="buttons-row">
          <button onClick={handleSearch} disabled={isAnimating}>Search (by Value)</button>
          <button onClick={handleInsert} disabled={isAnimating}>Insert</button>
          <button onClick={handleUpdate} disabled={isAnimating}>Update</button>
          <button onClick={handleDelete} disabled={isAnimating} className="btn-danger">Delete (by Index)</button>
          <button onClick={handleReset} disabled={isAnimating} className="btn-secondary">Reset</button>
        </div>
      </div>

      <div className="array-log-box">
        {logs.map((log, i) => (
          <div key={i} className="log-entry">{log}</div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  );
}

import MarkAsDoneButton from '../components/MarkAsDoneButton';
import { useState, useRef, useEffect } from 'react';
import './TreePage.css';

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.id = Date.now() + Math.random();
  }
}

export default function TreePage() {
  const [root, setRoot] = useState(null);
  const [valInput, setValInput] = useState('');
  const [logs, setLogs] = useState(['Welcome! Select a Tree operation.']);
  const [activeNodes, setActiveNodes] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const logEndRef = useRef(null);
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (msg) => setLogs((prev) => [...prev, msg]);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleInsert = async () => {
    const val = parseInt(valInput);
    if (isNaN(val)) return setLogs(['Error: Please enter a valid Value.']);

    setIsAnimating(true);
    setLogs([`--- Starting BST Insertion of [${val}] ---`]);

    if (!root) {
      addLog(`Tree is empty. Making [${val}] the new Root.`);
      setRoot(new TreeNode(val));
      setIsAnimating(false);
      return;
    }

    let current = root;
    let path = [];
    
    while (true) {
      path.push(current.id);
      setActiveNodes([...path]);
      addLog(`Visiting node [${current.val}].`);
      await sleep(800);

      if (val === current.val) {
        addLog(`Value [${val}] already exists in the tree! Ignoring.`);
        break;
      } else if (val < current.val) {
        addLog(`[${val}] is less than [${current.val}]. Going left...`);
        if (!current.left) {
          await sleep(400);
          current.left = new TreeNode(val);
          addLog(`Found empty spot! Inserting [${val}] as left child of [${current.val}].`);
          setRoot({...root});
          break;
        }
        current = current.left;
      } else {
        addLog(`[${val}] is greater than [${current.val}]. Going right...`);
        if (!current.right) {
          await sleep(400);
          current.right = new TreeNode(val);
          addLog(`Found empty spot! Inserting [${val}] as right child of [${current.val}].`);
          setRoot({...root});
          break;
        }
        current = current.right;
      }
    }

    await sleep(800);
    setActiveNodes([]);
    addLog(`--- Insertion Complete ---`);
    setIsAnimating(false);
  };

  const handleSearch = async () => {
    const val = parseInt(valInput);
    if (isNaN(val)) return setLogs(['Error: Please enter a valid Value.']);
    if (!root) return setLogs(['Error: Tree is empty.']);

    setIsAnimating(true);
    setLogs([`--- Searching for [${val}] in BST ---`]);
    let current = root;
    
    while (current) {
      setActiveNodes([current.id]);
      addLog(`Comparing with node [${current.val}]...`);
      await sleep(1000);

      if (val === current.val) {
        addLog(`Match found! Node [${val}] exists in the tree.`);
        addLog(`--- Search Successful ---`);
        setIsAnimating(false);
        return;
      } else if (val < current.val) {
        addLog(`[${val}] < [${current.val}]. Moving to left child.`);
        current = current.left;
      } else {
        addLog(`[${val}] > [${current.val}]. Moving to right child.`);
        current = current.right;
      }
    }

    setActiveNodes([]);
    addLog(`Reached a leaf. Value [${val}] was not found in the tree.`);
    addLog(`--- Search Failed ---`);
    setIsAnimating(false);
  };

  const handleInorder = async () => {
    if (!root) return setLogs(['Error: Tree is empty.']);
    setIsAnimating(true);
    setLogs([`--- Starting Inorder Traversal (Left, Root, Right) ---`]);
    
    const traverse = async (node) => {
      if (!node) return;
      
      addLog(`Navigating to left child of [${node.val}]...`);
      await traverse(node.left);
      
      setActiveNodes([node.id]);
      addLog(`Visiting Root: [${node.val}]`);
      await sleep(800);
      setActiveNodes([]);
      
      addLog(`Navigating to right child of [${node.val}]...`);
      await traverse(node.right);
    };

    await traverse(root);
    addLog(`--- Inorder Traversal Complete ---`);
    setIsAnimating(false);
  };

  const handleClear = () => {
    setRoot(null);
    setLogs(['Tree cleared.']);
    setActiveNodes([]);
    setValInput('');
  };

  const renderTree = (node) => {
    if (!node) return null;
    return (
      <div className="tf-tree">
        <ul>
          <li>
            <span className={`tf-nc ${activeNodes.includes(node.id) ? 'active' : ''}`}>
              {node.val}
            </span>
            {(node.left || node.right) && (
              <ul>
                <li>{node.left ? renderTree(node.left) : <span className="tf-nc empty"></span>}</li>
                <li>{node.right ? renderTree(node.right) : <span className="tf-nc empty"></span>}</li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="ds-container">
      <div className="ds-header">
        <h2>Binary Search Tree</h2>
        <p>Visualize BST insertions, searches, and Traversals.</p>
      </div>

      <div className="theory-box" style={{ background: 'var(--bg)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '2rem' }}>
        <h3 style={{ marginTop: 0, color: 'var(--text-h)' }}>Binary Search Tree Theory</h3>
        <p style={{ color: 'var(--text)', lineHeight: '1.6' }}>A Binary Search Tree is a node-based binary tree data structure where the left subtree contains only nodes with keys lesser than the parent’s key, and the right subtree has greater keys.</p>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', fontSize: '0.9rem' }}>
          <div><strong style={{color: 'var(--text-h)'}}>Time Complexity:</strong> <span style={{color: 'var(--text)'}}> Search/Insert/Delete: O(log n) average, O(n) worst-case </span></div>
          <div><strong style={{color: 'var(--text-h)'}}>Space Complexity:</strong> <span style={{color: 'var(--text)'}}> O(n) </span></div>
        </div>
      </div>


      <div className="ds-visualizer tree-visualizer">
        {!root ? <div className="tree-empty-msg">Empty Tree</div> : renderTree(root)}
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
              placeholder="e.g. 50"
            />
          </div>
        </div>
        <div className="buttons-row">
          <button onClick={handleInsert} disabled={isAnimating}>Insert</button>
          <button onClick={handleSearch} disabled={isAnimating} className="btn-secondary">Search</button>
          <button onClick={handleInorder} disabled={isAnimating} className="btn-secondary">Inorder</button>
          <button onClick={handleClear} disabled={isAnimating} className="btn-danger">Clear</button>
        </div>
      </div>

      <div className="ds-log-box">
        {logs.map((log, i) => (
          <div key={i} className="log-entry">{log}</div>
        ))}
        <div ref={logEndRef} />
      </div>
    
      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
        <MarkAsDoneButton topicId="tree" topicName="Tree" />
      </div>
    </div>
  );
}
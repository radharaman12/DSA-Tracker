import MarkAsDoneButton from '../components/MarkAsDoneButton';
import { useState, useRef, useEffect } from 'react';
import './GraphPage.css';

export default function GraphPage() {
  const [nodes, setNodes] = useState([]); // {id, x, y, label}
  const [edges, setEdges] = useState([]); // {u, v}
  const [nodeInput, setNodeInput] = useState('');
  const [edgeSource, setEdgeSource] = useState('');
  const [edgeTarget, setEdgeTarget] = useState('');
  const [logs, setLogs] = useState(['Welcome! Build a Graph and run BFS/DFS. Drag nodes to customize.']);
  const [activeNodes, setActiveNodes] = useState([]);
  const [activeEdges, setActiveEdges] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [draggingNode, setDraggingNode] = useState(null);
  
  const containerRef = useRef(null);
  const logEndRef = useRef(null);
  
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (msg) => setLogs((prev) => [...prev, msg]);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // --- Pointer Handlers for Dragging ---
  const handlePointerDown = (e, id) => {
    if (isAnimating) return;
    setDraggingNode(id);
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (draggingNode === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setNodes(prev => prev.map(n => n.id === draggingNode ? { ...n, x, y } : n));
  };

  const handlePointerUp = (e) => {
    if (draggingNode !== null) {
      e.target.releasePointerCapture(e.pointerId);
      setDraggingNode(null);
    }
  };

  // --- Operations ---
  const handleAddNode = () => {
    if (nodes.length >= 12) return setLogs(['Error: Max 12 nodes allowed.']);
    
    // Calculate circular position
    const radius = 120;
    const center = { x: containerRef.current ? containerRef.current.clientWidth / 2 : 250, y: 175 };
    const angle = (nodes.length / 12) * (2 * Math.PI);
    
    const newNode = {
      id: nodes.length,
      label: nodeInput.trim() || String.fromCharCode(65 + nodes.length),
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle)
    };
    
    setNodes([...nodes, newNode]);
    addLog(`Added Node [${newNode.label}]. You can drag it to position it!`);
    setNodeInput('');
  };

  const handleAddEdge = () => {
    const s = edgeSource.trim();
    const t = edgeTarget.trim();
    if (!s || !t) return setLogs(['Error: Please provide Source and Target node labels.']);
    
    const uNode = nodes.find(n => n.label === s);
    const vNode = nodes.find(n => n.label === t);
    
    if (!uNode || !vNode) return setLogs([`Error: Could not find nodes [${s}] and/or [${t}].`]);
    if (uNode.id === vNode.id) return setLogs(['Error: Self-loops not supported in this visualizer.']);
    
    const edgeExists = edges.some(e => (e.u === uNode.id && e.v === vNode.id) || (e.u === vNode.id && e.v === uNode.id));
    if (edgeExists) return setLogs(['Error: Edge already exists.']);

    setEdges([...edges, { u: uNode.id, v: vNode.id }]);
    addLog(`Added Edge between [${s}] and [${t}].`);
    setEdgeSource('');
    setEdgeTarget('');
  };

  const handleBFS = async () => {
    if (nodes.length === 0) return setLogs(['Error: Graph is empty.']);
    setIsAnimating(true);
    setLogs([`--- Starting Breadth-First Search (BFS) ---`]);
    
    // Adjacency List
    const adj = {};
    nodes.forEach(n => adj[n.id] = []);
    edges.forEach(e => {
      adj[e.u].push(e.v);
      adj[e.v].push(e.u);
    });

    const startNode = nodes[0];
    const visited = new Set([startNode.id]);
    const queue = [startNode.id];
    
    addLog(`Starting at Node [${startNode.label}].`);

    while (queue.length > 0) {
      const currId = queue.shift();
      const curr = nodes.find(n => n.id === currId);
      
      setActiveNodes(prev => [...new Set([...prev, currId])]);
      addLog(`Visiting Node [${curr.label}]...`);
      await sleep(800);

      for (let neighborId of adj[currId]) {
        if (!visited.has(neighborId)) {
          visited.add(neighborId);
          queue.push(neighborId);
          setActiveEdges(prev => [...prev, `${currId}-${neighborId}`, `${neighborId}-${currId}`]);
          
          const neighbor = nodes.find(n => n.id === neighborId);
          addLog(`Found unvisited neighbor [${neighbor.label}]. Enqueuing it.`);
          await sleep(600);
        }
      }
    }

    addLog(`--- BFS Complete ---`);
    await sleep(1000);
    setActiveNodes([]);
    setActiveEdges([]);
    setIsAnimating(false);
  };

  const handleClear = () => {
    setNodes([]);
    setEdges([]);
    setActiveNodes([]);
    setActiveEdges([]);
    setLogs(['Graph cleared.']);
  };

  return (
    <div className="ds-container">
      <div className="ds-header">
        <h2>Graph Traversals</h2>
        <p>Build a graph, drag nodes to customize layout, and run BFS!</p>
      </div>

      <div className="theory-box" style={{ background: 'var(--bg)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '2rem' }}>
        <h3 style={{ marginTop: 0, color: 'var(--text-h)' }}>Graph Theory</h3>
        <p style={{ color: 'var(--text)', lineHeight: '1.6' }}>A graph is a non-linear data structure consisting of vertices (nodes) and edges. It is used to represent networks like roads, social connections, and computer networks.</p>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', fontSize: '0.9rem' }}>
          <div><strong style={{color: 'var(--text-h)'}}>Time Complexity:</strong> <span style={{color: 'var(--text)'}}> Varies by representation (Adjacency Matrix vs List). DFS/BFS: O(V + E) </span></div>
          <div><strong style={{color: 'var(--text-h)'}}>Space Complexity:</strong> <span style={{color: 'var(--text)'}}> O(V + E) </span></div>
        </div>
      </div>


      <div 
        className="ds-visualizer graph-visualizer" 
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <svg className="graph-svg">
          {edges.map((e, i) => {
            const u = nodes.find(n => n.id === e.u);
            const v = nodes.find(n => n.id === e.v);
            if (!u || !v) return null;
            const isEdgeActive = activeEdges.includes(`${u.id}-${v.id}`) || activeEdges.includes(`${v.id}-${u.id}`);
            return (
              <line 
                key={i} 
                x1={u.x} y1={u.y} 
                x2={v.x} y2={v.y} 
                className={`graph-edge ${isEdgeActive ? 'active' : ''}`} 
              />
            );
          })}
        </svg>
        
        {nodes.map(node => (
          <div 
            key={node.id}
            onPointerDown={(e) => handlePointerDown(e, node.id)}
            className={`graph-node ${activeNodes.includes(node.id) ? 'active' : ''} ${draggingNode === node.id ? 'dragging' : ''}`}
            style={{ left: node.x, top: node.y }}
          >
            {node.label}
          </div>
        ))}
        {nodes.length === 0 && <div className="graph-empty">Empty Graph</div>}
      </div>

      <div className="ds-controls-box graph-controls-box">
        <div className="inputs-row">
          <div className="input-group">
            <label>New Node Label</label>
            <input 
              type="text" 
              value={nodeInput} 
              onChange={(e) => setNodeInput(e.target.value)} 
              disabled={isAnimating}
              placeholder="Auto (A, B...)"
              maxLength={3}
            />
          </div>
          <button onClick={handleAddNode} disabled={isAnimating}>Add Node</button>
        </div>

        <div className="inputs-row edge-inputs">
          <div className="input-group">
            <label>Source Node</label>
            <input 
              type="text" 
              value={edgeSource} 
              onChange={(e) => setEdgeSource(e.target.value)} 
              disabled={isAnimating}
              placeholder="e.g. A"
              maxLength={3}
            />
          </div>
          <div className="input-group">
            <label>Target Node</label>
            <input 
              type="text" 
              value={edgeTarget} 
              onChange={(e) => setEdgeTarget(e.target.value)} 
              disabled={isAnimating}
              placeholder="e.g. B"
              maxLength={3}
            />
          </div>
          <button onClick={handleAddEdge} disabled={isAnimating}>Add Edge</button>
        </div>

        <div className="buttons-row mt-3">
          <button onClick={handleBFS} disabled={isAnimating} className="btn-primary">Run BFS</button>
          <button onClick={handleClear} disabled={isAnimating} className="btn-danger">Clear Graph</button>
        </div>
      </div>

      <div className="ds-log-box">
        {logs.map((log, i) => (
          <div key={i} className="log-entry">{log}</div>
        ))}
        <div ref={logEndRef} />
      </div>
    
      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
        <MarkAsDoneButton topicId="graph" topicName="Graph" />
      </div>
    </div>
  );
}
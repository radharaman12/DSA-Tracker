import { Link } from 'react-router-dom';
import './DataStructuresPage.css';

export default function DataStructuresPage() {
  const structures = [
    { 
      name: 'Arrays', 
      path: '/arrays', 
      desc: 'Visualize fixed-capacity continuous memory blocks with shift-based insertions, deletions, and linear search traversal.', 
      active: true 
    },
    { 
      name: 'Linked List', 
      path: '/linked-list', 
      desc: 'Visualize node-based memory with sequential pointer traversal, dynamic resizing, and pointer adjustments.', 
      active: true 
    },
    { 
      name: 'Stack', 
      path: '/stack', 
      desc: 'LIFO (Last In, First Out) data structure. Perfect for undo operations and recursion tracking.', 
      active: true 
    },
    { 
      name: 'Queue', 
      path: '/queue', 
      desc: 'FIFO (First In, First Out) data structure. Ideal for scheduling and buffering.', 
      active: true 
    },
    { 
      name: 'Binary Tree', 
      path: '/tree', 
      desc: 'Hierarchical node structures representing parent-child relationships.', 
      active: true 
    },
    { 
      name: 'Graphs', 
      path: '/graph', 
      desc: 'Vertices and edges representation for complex network mapping.', 
      active: true 
    },
  ];

  return (
    <div className="ds-page">
      <div className="ds-header">
        <h2>Data Structures</h2>
        <p>Select a data structure below to interactively visualize its core operations.</p>
      </div>
      <div className="ds-grid">
        {structures.map((ds, index) => (
          ds.active ? (
            <Link to={ds.path} key={index} className="ds-card active-card">
              <h3>{ds.name}</h3>
              <p>{ds.desc}</p>
              <span className="ds-link-text">Explore Visualizer →</span>
            </Link>
          ) : (
            <div key={index} className="ds-card inactive-card">
              <h3>{ds.name}</h3>
              <p>{ds.desc}</p>
              <span className="ds-link-text coming-soon">Coming Soon</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';

export default function CodeViewer({ meta, currentCodeLine }) {
  const [viewMode, setViewMode] = useState('pseudocode');

  if (!meta) return null;

  const lines = viewMode === 'pseudocode' ? meta.pseudocode : viewMode === 'java' ? meta.java : meta.cpp;

  return (
    <div className="viz-code-viewer">
      <div className="viz-code-header">
        <button
          className={viewMode === 'pseudocode' ? 'active' : ''}
          onClick={() => setViewMode('pseudocode')}
        >
          Pseudocode
        </button>
        <button
          className={viewMode === 'java' ? 'active' : ''}
          onClick={() => setViewMode('java')}
        >
          Java
        </button>
        <button
          className={viewMode === 'cpp' ? 'active' : ''}
          onClick={() => setViewMode('cpp')}
        >
          C++
        </button>
      </div>
      <pre className="viz-code-block">
        {lines.map((line, lineIndex) => (
          <div
            key={lineIndex}
            className={`viz-code-line ${lineIndex === currentCodeLine ? 'viz-code-highlight' : ''}`}
          >
            <span className="viz-line-num">{lineIndex + 1}</span>
            <span className="viz-line-text">{line}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}

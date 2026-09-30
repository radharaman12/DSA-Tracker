import { algorithmList } from '..';

export default function AlgorithmSelector({ selected, onSelect }) {
  const searching = algorithmList.filter((a) => a.category === 'Searching');
  const sorting = algorithmList.filter((a) => a.category === 'Sorting');

  return (
    <div className="viz-selector">
      <div className="viz-selector-group">
        <h3>Searching</h3>
        <div className="viz-selector-buttons">
          {searching.map((algo) => (
            <button
              key={algo.key}
              className={selected === algo.key ? 'active' : ''}
              onClick={() => onSelect(algo.key)}
            >
              {algo.name}
            </button>
          ))}
        </div>
      </div>
      <div className="viz-selector-group">
        <h3>Sorting</h3>
        <div className="viz-selector-buttons">
          {sorting.map((algo) => (
            <button
              key={algo.key}
              className={selected === algo.key ? 'active' : ''}
              onClick={() => onSelect(algo.key)}
            >
              {algo.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

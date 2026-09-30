export default function ArrayBars({ step, array = [] }) {
  const values = step?.array ?? array;
  const maximum = Math.max(1, ...values.map((value) => Math.abs(value)));
  const activeIndices = new Set(step?.indices ?? []);
  const range = step?.range;

  if (values.length === 0) {
    return <div className="viz-bars viz-bars-empty">Apply an array to begin</div>;
  }

  return (
    <div className="viz-bars" role="img" aria-label={`Array visualization with ${values.length} values`}>
      {values.map((value, index) => {
        const inRange = !range || (index >= range[0] && index <= range[1]);
        const stateClass = activeIndices.has(index)
          ? `viz-bar--${step?.type === 'found' ? 'found' : step?.type === 'pivot' ? 'pivot' : 'active'}`
          : '';
        return (
          <div className={`viz-bar-wrapper${inRange ? '' : ' viz-bar-wrapper--muted'}`} key={`${index}-${value}`}>
            <div
              className={`viz-bar ${stateClass}`}
              style={{ height: `${Math.max(5, (Math.abs(value) / maximum) * 92)}%` }}
              title={`Index ${index}: ${value}`}
            />
            {values.length <= 20 && <span className="viz-bar-label">{value}</span>}
          </div>
        );
      })}
    </div>
  );
}

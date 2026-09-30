export default function StatsPanel({ step, meta }) {
  return (
    <section className="viz-stats" aria-label="Algorithm statistics">
      <div className="viz-stat-card viz-stat-wide">
        <span className="viz-stat-label">Algorithm</span>
        <span className="viz-stat-value">{meta?.name ?? 'Select an algorithm'}</span>
      </div>
      <div className="viz-stat-card">
        <span className="viz-stat-label">Comparisons</span>
        <span className="viz-stat-value">{step?.comparisons ?? 0}</span>
      </div>
      <div className="viz-stat-card">
        <span className="viz-stat-label">Swaps / writes</span>
        <span className="viz-stat-value">{step?.swaps ?? 0}</span>
      </div>
      <div className="viz-stat-card">
        <span className="viz-stat-label">Time · average</span>
        <span className="viz-stat-value">{meta?.timeComplexity?.average ?? '—'}</span>
      </div>
      <div className="viz-stat-card">
        <span className="viz-stat-label">Space</span>
        <span className="viz-stat-value">{meta?.spaceComplexity ?? '—'}</span>
      </div>
    </section>
  );
}

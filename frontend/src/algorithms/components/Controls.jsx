export default function Controls({
  isPlaying,
  isAtStart,
  isAtEnd,
  speed,
  setSpeed,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onReset,
  currentStep,
  totalSteps,
  hasSteps,
}) {
  return (
    <section className="viz-controls" aria-label="Playback controls">
      <div className="viz-controls-row">
        <button type="button" onClick={onReset} disabled={!hasSteps || isAtStart} aria-label="Reset" title="Reset">|‹</button>
        <button type="button" onClick={onPrevious} disabled={!hasSteps || isAtStart} aria-label="Previous step" title="Previous step">‹</button>
        {isPlaying ? (
          <button type="button" className="viz-play-btn" onClick={onPause} aria-label="Pause" title="Pause">Ⅱ</button>
        ) : (
          <button type="button" className="viz-play-btn" onClick={onPlay} disabled={!hasSteps} aria-label={isAtEnd && totalSteps > 0 ? 'Replay' : 'Play'} title={isAtEnd && totalSteps > 0 ? 'Replay' : 'Play'}>▶</button>
        )}
        <button type="button" onClick={onNext} disabled={!hasSteps || isAtEnd} aria-label="Next step" title="Next step">›</button>
      </div>
      <div className="viz-speed-row">
        <label htmlFor="viz-speed">Speed</label>
        <input id="viz-speed" type="range" min="1" max="10" value={speed} onChange={(event) => setSpeed(Number(event.target.value))} />
        <span className="viz-speed-label">{speed}×</span>
      </div>
      <div className="viz-step-counter" aria-live="polite">
        {hasSteps ? `Step ${currentStep + 1} of ${totalSteps}` : 'No steps generated'}
      </div>
    </section>
  );
}

import { useState } from 'react';
import { algorithms } from '..';
import { useVisualizer } from '../../hooks/useVisualizer';
import AlgorithmSelector from './AlgorithmSelector';
import ArrayInput from './ArrayInput';
import ArrayBars from './ArrayBars';
import Controls from './Controls';
import StatsPanel from './StatsPanel';
import CodeViewer from './CodeViewer';
import './Visualizer.css';

export default function Visualizer() {
  const [selectedAlgo, setSelectedAlgo] = useState('bubbleSort');
  const [array, setArray] = useState([38, 27, 43, 3, 9, 82, 10]);
  const [target, setTarget] = useState(9);

  const visualizer = useVisualizer();
  const algo = algorithms[selectedAlgo];

  const handleRun = () => {
    const steps = algo.needsTarget
      ? algo.generate(array, target)
      : algo.generate(array);
    visualizer.loadSteps(steps);
  };

  const handleAlgoSelect = (key) => {
    setSelectedAlgo(key);
    visualizer.loadSteps([]);
  };

  const handleArrayChange = (newArr) => {
    setArray(newArr);
    visualizer.loadSteps([]);
  };

  const handleTargetChange = (t) => {
    setTarget(t);
    visualizer.loadSteps([]);
  };

  const { currentStepData } = visualizer;

  return (
    <div className="viz-container">
      <header className="viz-header">
        <h1>DSA Visualizer</h1>
        <p className="viz-description">{algo.meta.description}</p>
      </header>

      <AlgorithmSelector selected={selectedAlgo} onSelect={handleAlgoSelect} />

      <ArrayInput
        onArrayChange={handleArrayChange}
        needsTarget={algo.needsTarget}
        onTargetChange={handleTargetChange}
      />

      <div className="viz-run-row">
        <button className="viz-run-btn" onClick={handleRun}>
          Run visualization
        </button>
      </div>

      {currentStepData && (
        <div className="viz-message">
          <span className="viz-message-type">{currentStepData.type}</span>
          <span>{currentStepData.message}</span>
        </div>
      )}

      <ArrayBars step={currentStepData} array={array} />

      <Controls
        isPlaying={visualizer.isPlaying}
        isAtStart={visualizer.isAtStart}
        isAtEnd={visualizer.isAtEnd}
        speed={visualizer.speed}
        setSpeed={visualizer.setSpeed}
        onPlay={visualizer.play}
        onPause={visualizer.pause}
        onNext={visualizer.next}
        onPrevious={visualizer.previous}
        onReset={visualizer.reset}
        currentStep={visualizer.currentStep}
        totalSteps={visualizer.totalSteps}
        hasSteps={visualizer.totalSteps > 0}
      />

      <div className="viz-bottom-panels">
        <StatsPanel step={currentStepData} meta={algo.meta} />
        <CodeViewer
          meta={algo.meta}
          currentCodeLine={currentStepData?.codeLine ?? -1}
        />
      </div>
    </div>
  );
}

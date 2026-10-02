import { useState } from 'react';
import { algorithms } from '..';
import { useVisualizer } from '../../hooks/useVisualizer';
import AlgorithmSelector from './AlgorithmSelector';
import ArrayInput from './ArrayInput';
import ArrayBars from './ArrayBars';
import Controls from './Controls';
import StatsPanel from './StatsPanel';
import CodeViewer from './CodeViewer';
import MarkAsDoneButton from '../../components/MarkAsDoneButton';
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


  const algoTheory = {
    linearSearch: "Linear Search sequentially checks each element of the list until a match is found or the whole list has been searched.",
    binarySearch: "Binary Search finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.",
    bubbleSort: "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    selectionSort: "Selection Sort divides the input list into two parts: a sorted sublist and an unsorted sublist. It repeatedly selects the smallest element from the unsorted sublist and moves it to the sorted sublist.",
    insertionSort: "Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
    mergeSort: "Merge Sort is a divide and conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.",
    quickSort: "Quicksort is a divide and conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot, so that smaller elements are to the left and greater are to the right."
  };

  return (
    <div className="viz-container">
      <header className="viz-header">
        <h1>DSA Visualizer</h1>
        <p className="viz-description">{algo.meta.description}</p>
      </header>

      <div className="theory-box" style={{ background: 'var(--bg)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
        <h3 style={{ marginTop: 0, color: 'var(--text-h)' }}>{algo.name || 'Algorithm'} Theory</h3>
        <p style={{ color: 'var(--text)', lineHeight: '1.6', margin: 0 }}>{algoTheory[selectedAlgo]}</p>
      </div>


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
    
      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
        <MarkAsDoneButton topicId={selectedAlgo} topicName={algo.name} />
      </div>
    </div>
  );
}
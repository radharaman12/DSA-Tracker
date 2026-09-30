import { useState } from 'react';
import { generateRandomArray } from '../../utils/arrayUtils';

export default function ArrayInput({ onArrayChange, needsTarget, onTargetChange }) {
  const [inputValue, setInputValue] = useState('38, 27, 43, 3, 9, 82, 10');
  const [targetValue, setTargetValue] = useState('9');
  const [size, setSize] = useState(15);
  const [error, setError] = useState('');

  const handleApply = () => {
    const values = inputValue.split(',').map((value) => value.trim());
    const arr = values.map(Number);
    if (values.some((value) => value === '' || !Number.isInteger(Number(value)))) {
      setError('Enter whole numbers separated by commas.');
      return;
    }
    if (arr.length === 0 || arr.length > 50) {
      setError('Use between 1 and 50 values.');
      return;
    }
    if (needsTarget && (targetValue.trim() === '' || !Number.isInteger(Number(targetValue)))) {
      setError('Enter a whole-number search target.');
      return;
    }

    setError('');
    onArrayChange(arr);
    if (needsTarget) onTargetChange(Number(targetValue));
  };

  const handleRandom = () => {
    const arr = generateRandomArray(size);
    setError('');
    setInputValue(arr.join(', '));
    onArrayChange(arr);
    if (needsTarget) {
      const target = arr[Math.floor(Math.random() * arr.length)];
      setTargetValue(String(target));
      onTargetChange(target);
    }
  };

  return (
    <div className="viz-array-input">
      <div className="viz-input-row">
        <label htmlFor="viz-array">Array</label>
        <input
          id="viz-array"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="e.g. 38, 27, 43, 3, 9"
        />
      </div>

      {needsTarget && (
        <div className="viz-input-row">
          <label htmlFor="viz-target">Target</label>
          <input
            id="viz-target"
            type="number"
            value={targetValue}
            onChange={(e) => setTargetValue(e.target.value)}
            placeholder="Search target"
            style={{ width: 100 }}
          />
        </div>
      )}

      <div className="viz-input-row">
        <label htmlFor="viz-size">Size</label>
        <input
          id="viz-size"
          type="range"
          min={5}
          max={50}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />
        <span>{size}</span>
        <button type="button" onClick={handleRandom}>Randomize</button>
        <button type="button" onClick={handleApply} className="viz-apply-btn">Apply</button>
      </div>
      {error && <p className="viz-input-error" role="alert">{error}</p>}
    </div>
  );
}

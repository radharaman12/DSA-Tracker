import { useEffect, useState } from 'react';

export function useVisualizer() {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalSteps = steps.length;
  const currentStepData = steps[currentStep] ?? null;
  const isAtStart = currentStep === 0;
  const isAtEnd = totalSteps === 0 || currentStep >= totalSteps - 1;

  useEffect(() => {
    if (!isPlaying || totalSteps === 0) return undefined;
    if (currentStep >= totalSteps - 1) return undefined;

    const timer = window.setTimeout(() => {
      const nextStep = Math.min(currentStep + 1, totalSteps - 1);
      setCurrentStep(nextStep);
      if (nextStep >= totalSteps - 1) setIsPlaying(false);
    }, Math.max(60, 900 / speed));

    return () => window.clearTimeout(timer);
  }, [currentStep, isPlaying, speed, totalSteps]);

  const loadSteps = (newSteps) => {
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const play = () => {
    if (totalSteps === 0) return;
    if (totalSteps === 1) return;
    if (isAtEnd) setCurrentStep(0);
    setIsPlaying(true);
  };

  const pause = () => setIsPlaying(false);
  const next = () => {
    setIsPlaying(false);
    setCurrentStep((step) => Math.min(step + 1, Math.max(0, totalSteps - 1)));
  };
  const previous = () => {
    setIsPlaying(false);
    setCurrentStep((step) => Math.max(0, step - 1));
  };
  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return {
    currentStepData,
    currentStep,
    totalSteps,
    speed,
    setSpeed,
    isPlaying,
    isAtStart,
    isAtEnd,
    loadSteps,
    play,
    pause,
    next,
    previous,
    reset,
  };
}

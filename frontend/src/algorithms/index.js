import { binarySearchMeta, generateBinarySearchSteps } from './searching/binarySearch';
import { bubbleSortMeta, generateBubbleSortSteps } from './sorting/bubbleSort';
import { insertionSortMeta, generateInsertionSortSteps } from './sorting/insertionSort';
import { linearSearchMeta, generateLinearSearchSteps } from './searching/linearSearch';
import { mergeSortMeta, generateMergeSortSteps } from './sorting/mergeSort';
import { quickSortMeta, generateQuickSortSteps } from './sorting/quickSort';
import { selectionSortMeta, generateSelectionSortSteps } from './sorting/selectionSort';

export const algorithms = {
  linearSearch: { meta: linearSearchMeta, needsTarget: true, generate: generateLinearSearchSteps },
  binarySearch: { meta: binarySearchMeta, needsTarget: true, generate: generateBinarySearchSteps },
  bubbleSort: { meta: bubbleSortMeta, generate: generateBubbleSortSteps },
  selectionSort: { meta: selectionSortMeta, generate: generateSelectionSortSteps },
  insertionSort: { meta: insertionSortMeta, generate: generateInsertionSortSteps },
  mergeSort: { meta: mergeSortMeta, generate: generateMergeSortSteps },
  quickSort: { meta: quickSortMeta, generate: generateQuickSortSteps },
};

export const algorithmList = Object.entries(algorithms).map(([key, algorithm]) => ({
  key,
  ...algorithm.meta,
}));

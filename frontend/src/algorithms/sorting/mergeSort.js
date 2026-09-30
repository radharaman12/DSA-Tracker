export const mergeSortMeta = {
  name: 'Merge Sort',
  category: 'Sorting',
  timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
  spaceComplexity: 'O(n)',
  description: 'Splits the array into halves, sorts each half, and merges the sorted results.',
  pseudocode: ['split array into two halves', 'recursively sort each half', 'merge the halves in ascending order'],
  java: [
    'public void mergeSort(int[] array, int start, int end) {',
    '  if (end - start < 2) return;',
    '  int middle = start + (end - start) / 2;',
    '  mergeSort(array, start, middle);',
    '  mergeSort(array, middle, end);',
    '  merge(array, start, middle, end);',
    '}',
    'public void merge(int[] array, int start, int middle, int end) {',
    '  // Merge the two sorted ranges.',
    '}'
  ],
  cpp: [
    'void mergeSort(vector<int>& array, int start, int end) {',
    '  if (end - start < 2) return;',
    '  int middle = start + (end - start) / 2;',
    '  mergeSort(array, start, middle);',
    '  mergeSort(array, middle, end);',
    '  merge(array, start, middle, end);',
    '}',
    'void merge(vector<int>& array, int start, int middle, int end) {',
    '  // Merge the two sorted ranges.',
    '}'
  ],
};

export function generateMergeSortSteps(input) {
  const array = [...input];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  steps.push({ type: 'start', array: [...array], indices: [], message: 'Starting Merge Sort', codeLine: 0, comparisons, swaps });

  function merge(start, middle, end) {
    const left = array.slice(start, middle);
    const right = array.slice(middle, end);
    let leftIndex = 0;
    let rightIndex = 0;
    let writeIndex = start;
    while (leftIndex < left.length && rightIndex < right.length) {
      comparisons++;
      const value = left[leftIndex] <= right[rightIndex] ? left[leftIndex++] : right[rightIndex++];
      array[writeIndex] = value;
      swaps++;
      steps.push({ type: 'write', array: [...array], indices: [writeIndex], range: [start, end - 1], message: `Write ${value} at index ${writeIndex}`, codeLine: 5, comparisons, swaps });
      writeIndex++;
    }
    while (leftIndex < left.length) {
      array[writeIndex] = left[leftIndex++];
      swaps++;
      steps.push({ type: 'write', array: [...array], indices: [writeIndex], range: [start, end - 1], message: `Write ${array[writeIndex]} at index ${writeIndex}`, codeLine: 5, comparisons, swaps });
      writeIndex++;
    }
    while (rightIndex < right.length) {
      array[writeIndex] = right[rightIndex++];
      swaps++;
      steps.push({ type: 'write', array: [...array], indices: [writeIndex], range: [start, end - 1], message: `Write ${array[writeIndex]} at index ${writeIndex}`, codeLine: 5, comparisons, swaps });
      writeIndex++;
    }
  }

  function sort(start, end) {
    if (end - start < 2) return;
    const middle = Math.floor((start + end) / 2);
    sort(start, middle);
    sort(middle, end);
    merge(start, middle, end);
  }

  sort(0, array.length);
  steps.push({ type: 'done', array: [...array], indices: [], message: 'Merge Sort complete', codeLine: 6, comparisons, swaps });
  return steps;
}

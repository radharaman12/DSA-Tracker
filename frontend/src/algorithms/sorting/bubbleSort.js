export const bubbleSortMeta = {
  name: 'Bubble Sort',
  category: 'Sorting',
  timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
  spaceComplexity: 'O(1)',
  description: 'Compares neighboring values and swaps them until the largest values bubble to the end.',
  pseudocode: ['repeat for each pass:', '  compare each neighboring pair', '  if left value is larger: swap', 'stop when a pass makes no swaps'],
  java: [
    'public void bubbleSort(int[] array) {',
    '  for (int end = array.length - 1; end > 0; end--) {',
    '    boolean swapped = false;',
    '    for (int i = 0; i < end; i++) {',
    '      if (array[i] > array[i + 1]) {',
    '        int temp = array[i]; array[i] = array[i + 1]; array[i + 1] = temp;',
    '        swapped = true;',
    '      }',
    '    }',
    '    if (!swapped) break;',
    '  }',
    '}'
  ],
  cpp: [
    'void bubbleSort(vector<int>& array) {',
    '  for (int end = array.size() - 1; end > 0; end--) {',
    '    bool swapped = false;',
    '    for (int i = 0; i < end; i++) {',
    '      if (array[i] > array[i + 1]) {',
    '        swap(array[i], array[i + 1]);',
    '        swapped = true;',
    '      }',
    '    }',
    '    if (!swapped) break;',
    '  }',
    '}'
  ],
};

export function generateBubbleSortSteps(input) {
  const array = [...input];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  steps.push({ type: 'start', array: [...array], indices: [], message: 'Starting Bubble Sort', codeLine: 0, comparisons, swaps });

  for (let end = array.length - 1; end > 0; end--) {
    let swapped = false;
    for (let index = 0; index < end; index++) {
      comparisons++;
      steps.push({ type: 'compare', array: [...array], indices: [index, index + 1], message: `Compare ${array[index]} and ${array[index + 1]}`, codeLine: 4, comparisons, swaps });
      if (array[index] > array[index + 1]) {
        [array[index], array[index + 1]] = [array[index + 1], array[index]];
        swaps++;
        swapped = true;
        steps.push({ type: 'swap', array: [...array], indices: [index, index + 1], message: `Swap to move ${array[index + 1]} right`, codeLine: 5, comparisons, swaps });
      }
    }
    if (!swapped) break;
  }

  steps.push({ type: 'done', array: [...array], indices: [], message: 'Bubble Sort complete', codeLine: 11, comparisons, swaps });
  return steps;
}

export const insertionSortMeta = {
  name: 'Insertion Sort',
  category: 'Sorting',
  timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
  spaceComplexity: 'O(1)',
  description: 'Builds a sorted prefix by shifting larger values right to insert each next value.',
  pseudocode: ['for each index i from 1:', '  key = array[i]', '  shift larger values right', '  insert key into the open position'],
  java: [
    'public void insertionSort(int[] array) {',
    '  for (int i = 1; i < array.length; i++) {',
    '    int key = array[i];',
    '    int j = i - 1;',
    '    while (j >= 0 && array[j] > key) {',
    '      array[j + 1] = array[j];',
    '      j--;',
    '    }',
    '    array[j + 1] = key;',
    '  }',
    '}'
  ],
  cpp: [
    'void insertionSort(vector<int>& array) {',
    '  for (int i = 1; i < array.size(); i++) {',
    '    int key = array[i];',
    '    int j = i - 1;',
    '    while (j >= 0 && array[j] > key) {',
    '      array[j + 1] = array[j];',
    '      j--;',
    '    }',
    '    array[j + 1] = key;',
    '  }',
    '}'
  ],
};

export function generateInsertionSortSteps(input) {
  const array = [...input];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  steps.push({ type: 'start', array: [...array], indices: [], message: 'Starting Insertion Sort', codeLine: 0, comparisons, swaps });

  for (let index = 1; index < array.length; index++) {
    const key = array[index];
    let cursor = index - 1;
    while (cursor >= 0) {
      comparisons++;
      steps.push({ type: 'compare', array: [...array], indices: [cursor, cursor + 1], message: `Compare ${array[cursor]} with key ${key}`, codeLine: 4, comparisons, swaps });
      if (array[cursor] <= key) break;
      array[cursor + 1] = array[cursor];
      swaps++;
      steps.push({ type: 'shift', array: [...array], indices: [cursor, cursor + 1], message: `Shift ${array[cursor]} one position right`, codeLine: 5, comparisons, swaps });
      cursor--;
    }
    array[cursor + 1] = key;
    swaps++;
    steps.push({ type: 'insert', array: [...array], indices: [cursor + 1], message: `Insert ${key} at index ${cursor + 1}`, codeLine: 8, comparisons, swaps });
  }

  steps.push({ type: 'done', array: [...array], indices: [], message: 'Insertion Sort complete', codeLine: 10, comparisons, swaps });
  return steps;
}

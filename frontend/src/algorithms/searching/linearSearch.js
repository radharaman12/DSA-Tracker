export const linearSearchMeta = {
  name: 'Linear Search',
  category: 'Searching',
  timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
  spaceComplexity: 'O(1)',
  description: 'Checks each value in order until it finds the target or reaches the end.',
  pseudocode: ['for each index i:', '  if array[i] equals target:', '    return i', 'return not found'],
  java: [
    'public int linearSearch(int[] array, int target) {',
    '  for (int i = 0; i < array.length; i++) {',
    '    if (array[i] == target) return i;',
    '  }',
    '  return -1;',
    '}'
  ],
  cpp: [
    'int linearSearch(vector<int>& array, int target) {',
    '  for (int i = 0; i < array.size(); i++) {',
    '    if (array[i] == target) return i;',
    '  }',
    '  return -1;',
    '}'
  ],
};

export function generateLinearSearchSteps(array, target) {
  const steps = [];
  let comparisons = 0;
  steps.push({ type: 'start', array: [...array], indices: [], message: `Searching for ${target}`, codeLine: 0, comparisons, swaps: 0 });

  for (let index = 0; index < array.length; index++) {
    comparisons++;
    steps.push({ type: 'compare', array: [...array], indices: [index], message: `Checking index ${index}: ${array[index]}`, codeLine: 2, comparisons, swaps: 0 });
    if (array[index] === target) {
      steps.push({ type: 'found', array: [...array], indices: [index], message: `Found ${target} at index ${index}`, codeLine: 2, comparisons, swaps: 0 });
      return steps;
    }
  }

  steps.push({ type: 'not-found', array: [...array], indices: [], message: `${target} was not found`, codeLine: 4, comparisons, swaps: 0 });
  return steps;
}

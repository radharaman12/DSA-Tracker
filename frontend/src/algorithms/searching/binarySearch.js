export const binarySearchMeta = {
  name: 'Binary Search',
  category: 'Searching',
  timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
  spaceComplexity: 'O(1)',
  description: 'Repeatedly halves a sorted array to locate a target. The visualizer sorts the input first.',
  pseudocode: ['low = 0, high = n - 1', 'while low <= high:', '  mid = floor((low + high) / 2)', '  if array[mid] equals target: return mid', '  if array[mid] < target: low = mid + 1', '  else: high = mid - 1', 'return not found'],
  java: [
    'public int binarySearch(int[] array, int target) {',
    '  int low = 0, high = array.length - 1;',
    '  while (low <= high) {',
    '    int mid = low + (high - low) / 2;',
    '    if (array[mid] == target) return mid;',
    '    if (array[mid] < target) low = mid + 1;',
    '    else high = mid - 1;',
    '  }',
    '  return -1;',
    '}'
  ],
  cpp: [
    'int binarySearch(vector<int>& array, int target) {',
    '  int low = 0, high = array.size() - 1;',
    '  while (low <= high) {',
    '    int mid = low + (high - low) / 2;',
    '    if (array[mid] == target) return mid;',
    '    if (array[mid] < target) low = mid + 1;',
    '    else high = mid - 1;',
    '  }',
    '  return -1;',
    '}'
  ],
};

export function generateBinarySearchSteps(input, target) {
  const array = [...input].sort((left, right) => left - right);
  const steps = [];
  let comparisons = 0;
  let low = 0;
  let high = array.length - 1;
  steps.push({ type: 'start', array: [...array], indices: [], message: 'Input sorted for Binary Search', codeLine: 0, comparisons, swaps: 0 });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;
    steps.push({ type: 'compare', array: [...array], indices: [mid], range: [low, high], message: `Checking middle index ${mid}: ${array[mid]}`, codeLine: 4, comparisons, swaps: 0 });
    if (array[mid] === target) {
      steps.push({ type: 'found', array: [...array], indices: [mid], range: [low, high], message: `Found ${target} at index ${mid}`, codeLine: 4, comparisons, swaps: 0 });
      return steps;
    }
    if (array[mid] < target) {
      low = mid + 1;
      steps.push({ type: 'search-range', array: [...array], indices: [], range: [low, high], message: 'Target is larger; search the right half', codeLine: 5, comparisons, swaps: 0 });
    } else {
      high = mid - 1;
      steps.push({ type: 'search-range', array: [...array], indices: [], range: [low, high], message: 'Target is smaller; search the left half', codeLine: 6, comparisons, swaps: 0 });
    }
  }

  steps.push({ type: 'not-found', array: [...array], indices: [], message: `${target} was not found`, codeLine: 8, comparisons, swaps: 0 });
  return steps;
}

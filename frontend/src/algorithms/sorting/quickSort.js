export const quickSortMeta = {
  name: 'Quick Sort',
  category: 'Sorting',
  timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
  spaceComplexity: 'O(log n)',
  description: 'Selects a pivot element and partitions the array so elements smaller than pivot are on the left and larger on the right, then recurses.',
  pseudocode: [
    'function quickSort(arr, low, high):',
    '  if low < high:',
    '    pi = partition(arr, low, high)',
    '    quickSort(arr, low, pi - 1)',
    '    quickSort(arr, pi + 1, high)',
    '',
    'function partition(arr, low, high):',
    '  pivot = arr[high]',
    '  i = low - 1',
    '  for j = low to high - 1:',
    '    if arr[j] < pivot:',
    '      i++, swap(arr[i], arr[j])',
    '  swap(arr[i+1], arr[high])',
    '  return i + 1',
  ],
  java: [
    'public void quickSort(int[] arr, int low, int high) {',
    '  if (low < high) {',
    '    int pi = partition(arr, low, high);',
    '    quickSort(arr, low, pi - 1);',
    '    quickSort(arr, pi + 1, high);',
    '  }',
    '}',
    '',
    'public int partition(int[] arr, int low, int high) {',
    '  int pivot = arr[high];',
    '  int i = low - 1;',
    '  for (int j = low; j < high; j++) {',
    '    if (arr[j] < pivot) {',
    '      i++;',
    '      int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;',
    '    }',
    '  }',
    '  int temp = arr[i+1]; arr[i+1] = arr[high]; arr[high] = temp;',
    '  return i + 1;',
    '}'
  ],
  cpp: [
    'void quickSort(vector<int>& arr, int low, int high) {',
    '  if (low < high) {',
    '    int pi = partition(arr, low, high);',
    '    quickSort(arr, low, pi - 1);',
    '    quickSort(arr, pi + 1, high);',
    '  }',
    '}',
    '',
    'int partition(vector<int>& arr, int low, int high) {',
    '  int pivot = arr[high];',
    '  int i = low - 1;',
    '  for (int j = low; j < high; j++) {',
    '    if (arr[j] < pivot) {',
    '      i++;',
    '      swap(arr[i], arr[j]);',
    '    }',
    '  }',
    '  swap(arr[i+1], arr[high]);',
    '  return i + 1;',
    '}'
  ],
};

export function generateQuickSortSteps(arr) {
  const steps = [];
  const a = [...arr];
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    type: 'start',
    array: [...a],
    indices: [],
    message: 'Starting Quick Sort',
    codeLine: 0,
    comparisons: 0,
    swaps: 0,
  });

  function partition(low, high) {
    const pivot = a[high];

    steps.push({
      type: 'pivot',
      array: [...a],
      indices: [high],
      range: [low, high],
      message: `Pivot = arr[${high}] = ${pivot}`,
      codeLine: 9,
      comparisons,
      swaps,
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;
      steps.push({
        type: 'compare',
        array: [...a],
        indices: [j, high],
        range: [low, high],
        message: `Comparing arr[${j}] = ${a[j]} with pivot ${pivot}`,
        codeLine: 12,
        comparisons,
        swaps,
      });

      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        swaps++;
        steps.push({
          type: 'swap',
          array: [...a],
          indices: [i, j],
          range: [low, high],
          message: `Swapped arr[${i}] and arr[${j}]`,
          codeLine: 14,
          comparisons,
          swaps,
        });
      }
    }

    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    swaps++;
    steps.push({
      type: 'pivot-placed',
      array: [...a],
      indices: [i + 1],
      range: [low, high],
      message: `Pivot ${pivot} placed at index ${i + 1}`,
      codeLine: 17,
      comparisons,
      swaps,
    });

    return i + 1;
  }

  function quickSortHelper(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  }

  quickSortHelper(0, a.length - 1);

  steps.push({
    type: 'done',
    array: [...a],
    indices: [],
    message: 'Quick Sort complete!',
    codeLine: 0,
    comparisons,
    swaps,
  });

  return steps;
}

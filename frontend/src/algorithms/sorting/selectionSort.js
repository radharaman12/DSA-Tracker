export const selectionSortMeta = {
	name: 'Selection Sort',
	category: 'Sorting',
	timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
	spaceComplexity: 'O(1)',
	description: 'Finds the smallest remaining value and places it at the next sorted position.',
	pseudocode: ['for each position i:', '  minIndex = i', '  scan the remaining values for a smaller value', '  swap array[i] and array[minIndex]'],
	java: [
		'public void selectionSort(int[] array) {',
		'  for (int i = 0; i < array.length - 1; i++) {',
		'    int minIndex = i;',
		'    for (int j = i + 1; j < array.length; j++) {',
		'      if (array[j] < array[minIndex]) minIndex = j;',
		'    }',
		'    if (minIndex != i) {',
		'      int temp = array[i]; array[i] = array[minIndex]; array[minIndex] = temp;',
		'    }',
		'  }',
		'}'
	],
	cpp: [
		'void selectionSort(vector<int>& array) {',
		'  for (int i = 0; i < array.size() - 1; i++) {',
		'    int minIndex = i;',
		'    for (int j = i + 1; j < array.size(); j++) {',
		'      if (array[j] < array[minIndex]) minIndex = j;',
		'    }',
		'    if (minIndex != i) {',
		'      swap(array[i], array[minIndex]);',
		'    }',
		'  }',
		'}'
	],
};

export function generateSelectionSortSteps(input) {
	const array = [...input];
	const steps = [];
	let comparisons = 0;
	let swaps = 0;
	steps.push({ type: 'start', array: [...array], indices: [], message: 'Starting Selection Sort', codeLine: 0, comparisons, swaps });

	for (let index = 0; index < array.length - 1; index++) {
		let minimum = index;
		for (let scan = index + 1; scan < array.length; scan++) {
			comparisons++;
			steps.push({ type: 'compare', array: [...array], indices: [minimum, scan], message: `Compare current minimum ${array[minimum]} with ${array[scan]}`, codeLine: 4, comparisons, swaps });
			if (array[scan] < array[minimum]) minimum = scan;
		}
		if (minimum !== index) {
			[array[index], array[minimum]] = [array[minimum], array[index]];
			swaps++;
			steps.push({ type: 'swap', array: [...array], indices: [index, minimum], message: `Place ${array[index]} at sorted index ${index}`, codeLine: 7, comparisons, swaps });
		}
	}

	steps.push({ type: 'done', array: [...array], indices: [], message: 'Selection Sort complete', codeLine: 10, comparisons, swaps });
	return steps;
}

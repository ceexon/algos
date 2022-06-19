const arr = [
  73338, 76966, 12070, 98784, 4712, 2919, 75737, 46559, 65372, 47356, 34254,
  29248, 20215, 421, 11587, 79378, 35623, 87259, 28398, 95775, 77682, 85318,
  12833, 41329, 72224, 95803, 3371, 3278, 20377, 85694, 86656, 35560, 59182,
  30544, 4586, 75285, 21739, 35167, 94609, 6023,
];
function quicksortV2(min, max) {
  let smallest = min - 1;
  for (let j = min; j <= max; j++) {
    if (arr[j] <= arr[max]) {
      smallest++;
      const temp = arr[j];
      arr[j] = arr[smallest];
      arr[smallest] = temp;
    }
  }

  const leftStart = min;
  const leftEnd = smallest - 1;
  if (smallest - leftStart > 1) {
    quicksortV2(leftStart, leftEnd);
  }

  const rightStart = smallest + 1;
  const rightEnd = max;

  if (max - smallest > 1) {
    quicksortV2(rightStart, rightEnd);
  }
}

function quicksort(min, max, smallest) {
  for (let j = min; j <= max; j++) {
    if (arr[j] <= arr[max]) {
      smallest++;
      const temp = arr[j];
      arr[j] = arr[smallest];
      arr[smallest] = temp;
    }
  }

  if (smallest - min > 1) {
    quicksort(min, smallest - 1, min - 1);
  }

  if (max - smallest > 1) {
    quicksort(smallest + 1, max, smallest);
  }
}

quicksort(0, arr.length - 1, -1);
console.log(arr);

const arr = [2, 0, 2, 1, 1, 0];
function quicksort(min, max) {
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
    quicksort(leftStart, leftEnd);
  }

  const rightStart = smallest + 1;
  const rightEnd = max;

  if (max - smallest > 1) {
    quicksort(rightStart, rightEnd);
  }
}

quicksort(0, arr.length - 1);
console.log(arr);

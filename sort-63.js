const arr = [
  2729, 1540, 878, 7280, 4323, 6717, 1349, 7889, 1833, 4037, 8888, 5641, 1486,
  1861, 4507, 7084, 4918, 1674, 2986, 1167, 6142, 639, 6871, 3607, 5000, 9080,
  2156, 8372, 5532, 2248, 9442, 1263, 2734, 3833, 4803, 4678, 9644, 7221, 3424,
  1072, 954, 4539, 5098, 2035, 1299, 9087, 5384, 5054, 7602, 1183, 399, 3066,
  6974, 7751, 9146, 656, 75, 6368, 7338, 1630, 7958, 5199, 8870,
];

const arrLen = arr.length;

const sortGroups = [7, 5, 3, 2];
let sections = 0;
let selectedSortGroup = 7;

for (const item of sortGroups) {
  if (arrLen % item === 0) {
    selectedSortGroup = item;
    sections = arrLen / item;
    break;
  }
}

if (!sections) {
  throw new Error("Array length is invalid");
}

// first index of a section
const firstSectionAnchors = [];
// last index of a section
const endSectionAnchors = [];
// smallest item index in section
const smallestSectionIndices = [];

let sectionStart = 0;
while (sectionStart < selectedSortGroup) {
  const start = sectionStart * sections;
  firstSectionAnchors.push(start);
  smallestSectionIndices.push(start - 1);
  endSectionAnchors.push(start + 9 - 1);
  sectionStart++;
}

function sort(
  currentItemIndex,
  lastItemIndex,
  currentSectionItemIndex,
  smallAnchors
) {
  if (arr[currentItemIndex] <= arr[lastItemIndex]) {
    let smallest = ++smallAnchors[currentSectionItemIndex];
    const temp = arr[currentItemIndex];
    arr[currentItemIndex] = arr[smallest];
    arr[smallest] = temp;
    smallAnchors[currentSectionItemIndex] = smallest;
  }
}

function quicksort(firstAnchors, endAnchors, smallAnchors) {
  firstAnchors.forEach((first, i) => {
    let start = 0;
    for (let j = first; j <= endAnchors[i]; j++) {
      const lastItemIndex = endAnchors[i];
      sort(j, lastItemIndex, i, smallAnchors);
      start++;
    }

    const newFirstAnchors = [];
    const newEndAnchors = [];
    const newSmallAnchors = [];

    const smallest = smallAnchors[i];
    const startIndex = first;
    const endIndex = endAnchors[i];

    // push left
    if (smallest - startIndex > 1) {
      newFirstAnchors.push(startIndex);
      newEndAnchors.push(smallest - 1);
      newSmallAnchors.push(startIndex - 1);
    }
    // push right
    if (endIndex - smallest > 1) {
      newFirstAnchors.push(smallest + 1);
      newEndAnchors.push(endIndex);
      newSmallAnchors.push(smallest);
    }

    quicksort(newFirstAnchors, newEndAnchors, newSmallAnchors);
  });
}

// quicksort(firstSectionAnchors, endSectionAnchors, smallestSectionIndices);
quicksort([0], [62], [-1]);
console.log(arr);

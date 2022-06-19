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

let start = 0;

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

function quicksort(firstAnchors, endAnchors, smallAnchors, sections) {
  console.log("first anchors -> ", firstAnchors);
  console.log("end anchors ->", endAnchors);
  console.log("small Anchors ->", smallAnchors);
  console.log("sections", sections);

  console.log("-------------------- SORT -------------------------------");
  if (sections) {
    let start = 0;
    while (start < sections) {
      for (let i = 0; i < endAnchors.length; i++) {
        const currentItemIndex = firstAnchors[i] + start;
        const lastItemIndex = endAnchors[i];

        sort(currentItemIndex, lastItemIndex, i, smallAnchors);
      }
      start++;
    }
  }

  const newFirstAnchors = [];
  const newEndAnchors = [];
  const newSmallAnchors = [];
  const newSections = sections * 2;

  endAnchors.forEach((endIndex, index) => {
    const smallest = smallAnchors[index];
    const startIndex = firstAnchors[index];
    if (smallest !== endIndex) {
      // push left
      newFirstAnchors.push(startIndex);
      newEndAnchors.push(smallest - 1);
      newSmallAnchors.push(startIndex - 1);
      // push right
      newFirstAnchors.push(smallest + 1);
      newEndAnchors.push(endIndex);
      newSmallAnchors.push(smallest);
    }
  });

  //   quicksort(newFirstAnchors, newEndAnchors, newSmallAnchors, newSections)

  console.log(smallAnchors);
  console.log("New first anchors -> ", newFirstAnchors);
  console.log("New end anchors ->", newEndAnchors);
  console.log("New small Anchors ->", newSmallAnchors);
  console.log("New sections", newSections);
}

quicksort(
  firstSectionAnchors,
  endSectionAnchors,
  smallestSectionIndices,
  sections
);
console.log(arr);

/**
 * @param {string} s
 * @return {string}
 */
const longestPalindrome = function (s) {
  let longest = "";
  let longestLen = 0;
  const tracker = {};
  // tracker = { a: [1,5,7,8,19] }

  let i = 0;
  while (s[i]) {
    const letter = s[i];

    if (tracker[letter]) {
      let j = 0;
      while (i + 1 - tracker[letter][j] > longestLen) {
        let isPalindromic = false;
        let left = "";
        let right = "";
        const start = tracker[letter][j];
        for (let k = 0; k <= i; k++) {
          if (k + start < i - k) {
            isPalindromic = s[k + start] === s[i - k];
            if (!isPalindromic) {
              break;
            }
            left += s[k + start];
            right = s[i - k] + right;
          } else {
            if (k + start === i - k) {
              left += s[k + start];
            }
            break;
          }
        }

        if (isPalindromic) {
          longest = left + right;
          longestLen = i + 1 - tracker[letter][j];
        }
        j++;
      }

      tracker[letter].push(i);
    } else {
      tracker[letter] = [i];
      if (i === 0) {
        longest = letter;
        longestLen = 1;
      }
    }

    i++;
  }

  console.log(longest);
  if (longestLen === i + 1) {
    return s;
  }

  return longest;
};

longestPalindrome("adddddddddddddddddddddddddddddahha");
longestPalindrome("babad");
longestPalindrome("cbbd");
longestPalindrome("cbrtbd");

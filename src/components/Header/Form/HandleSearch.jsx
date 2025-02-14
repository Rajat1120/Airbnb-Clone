import {
  setCity,
  setInputSearchIds,
  setSelectedCountry,
  setSelectedIcon,
} from "../../../redux/AppSlice";

export function findMatchingKeys(inputString, arr) {
  // Helper function to remove spaces, punctuation, and convert to lowercase
  const sanitizeString = (str) => str.replace(/[^a-zA-Z]/g, "").toLowerCase();

  // Sanitize the input string
  const sanitizedInput = sanitizeString(inputString);

  // Function to calculate character frequency in a string
  const charFrequency = (str) => {
    return [...str].reduce((acc, char) => {
      acc[char] = (acc[char] || 0) + 1;
      return acc;
    }, {});
  };

  // Calculate character frequency of sanitized input
  const inputFrequency = charFrequency(sanitizedInput);

  // Function to check if two objects have at least 90% matching character frequencies
  const isNinetyPercentMatch = (inputFreq, targetFreq) => {
    let matchCount = 0;
    let totalChars = 0;

    for (let char in inputFreq) {
      if (targetFreq[char]) {
        matchCount += Math.min(inputFreq[char], targetFreq[char]);
      }
      totalChars += inputFreq[char];
    }

    return matchCount / totalChars >= 0.9;
  };

  const result = [];

  // Loop over the array
  arr.forEach((item) => {
    for (let key in item) {
      // Sanitize the value and calculate its frequency
      const sanitizedValue = sanitizeString(item[key]);
      const valueFrequency = charFrequency(sanitizedValue);

      // Check if the value is a 90% match
      if (isNinetyPercentMatch(inputFrequency, valueFrequency)) {
        result.push(key);
      }
    }
  });

  return result;
}

export function handleSearchInput(
  region,
  destinationInputVal,
  combinedString,
  dispatch
) {
  let result;
  if (region !== "all") {
    result = findMatchingKeys(region, combinedString);
  } else {
    result = findMatchingKeys(destinationInputVal, combinedString);
  }

  dispatch(setInputSearchIds(result));
  dispatch(setSelectedCountry(""));
  dispatch(setCity(""));
  dispatch(setSelectedIcon(""));
}

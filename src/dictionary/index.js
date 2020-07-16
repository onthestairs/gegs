import words from "./words.json";

const makePattern = (letters) => {
  return "^" + letters.replace(/\?/g, "[A-Z]") + "$";
};

export const wordsThatMatchPattern = (letters) => {
  const pattern = makePattern(letters);
  console.log("pattern:", pattern);
  const regex = new RegExp(pattern, "i");
  return words.filter((word) => {
    return regex.test(word);
  });
};

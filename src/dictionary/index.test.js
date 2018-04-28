import { wordsThatMatchPattern } from "./index";

it("has some words in the dict", () => {
  const expectedWords = [
    "BALD",
    "BAND",
    "BARD",
    "BAUD",
    "BAWD",
    "BEAD",
    "BEND",
    "BIND",
    "BIRD",
    "BOLD",
    "BOND",
    "BOYD",
    "BRAD",
    "BRED",
    "BYRD"
  ];
  expect(wordsThatMatchPattern("B??D")).toEqual(expectedWords);
});

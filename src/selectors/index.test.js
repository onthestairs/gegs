import { populateClues } from "./index";

it("handles non-spilling single word clues", () => {
  const gridClues = [
    {
      n: 1,
      direction: "down",
      gridAnswer: "neighbours"
    }
  ];
  const clueBank = [
    { clue: "Blair and Brown possibly ignore Bush", answer: "NEIGHBOURS" }
  ];
  const populatedClues = populateClues(gridClues, clueBank);
  const expected = [
    {
      n: 1,
      direction: "down",
      clue: "Blair and Brown possibly ignore Bush",
      answer: "NEIGHBOURS",
      type: "single"
    }
  ];
  expect(populatedClues).toEqual(expected);
});

it("handles non-spilling multi word clues", () => {
  const gridClues = [
    {
      n: 1,
      direction: "across",
      gridAnswer: "tonyblair"
    }
  ];
  const clueBank = [{ clue: "Tory in lab disguise", answer: "TONY BLAIR" }];
  const populatedClues = populateClues(gridClues, clueBank);
  const expected = [
    {
      n: 1,
      direction: "across",
      clue: "Tory in lab disguise",
      answer: "TONY BLAIR",
      type: "single"
    }
  ];
  expect(populatedClues).toEqual(expected);
});

it("handles non-spilling hyphenated word clues", () => {
  const gridClues = [
    {
      n: 2,
      direction: "across",
      gridAnswer: "visavis"
    }
  ];
  const clueBank = [
    {
      clue: "With regards to a travel document and an incomplete one",
      answer: "VIS-A-VIS"
    }
  ];
  const populatedClues = populateClues(gridClues, clueBank);
  const expected = [
    {
      n: 2,
      direction: "across",
      clue: "With regards to a travel document and an incomplete one",
      answer: "VIS-A-VIS",
      type: "single"
    }
  ];
  expect(populatedClues).toEqual(expected);
});

it("handles missing clues", () => {
  const gridClues = [
    {
      n: 1,
      direction: "down",
      gridAnswer: "buffoon"
    }
  ];
  const clueBank = [
    { clue: "Blair and Brown possibly ignore Bush", answer: "NEIGHBOURS" }
  ];
  const populatedClues = populateClues(gridClues, clueBank);
  const expected = [
    {
      n: 1,
      direction: "down",
      gridAnswer: "buffoon",
      type: "missing"
    }
  ];
  expect(populatedClues).toEqual(expected);
});

it("handles spilling multi word clues", () => {
  const gridClues = [
    {
      n: 1,
      direction: "across",
      gridAnswer: "tony"
    },
    {
      n: 10,
      direction: "down",
      gridAnswer: "blair"
    }
  ];
  const clueBank = [{ clue: "Tory in lab disguise", answer: "TONY BLAIR" }];
  const populatedClues = populateClues(gridClues, clueBank);
  const expected = [
    {
      n: 1,
      direction: "across",
      clue: "Tory in lab disguise",
      answer: "TONY BLAIR",
      type: "start"
    },
    {
      n: 10,
      direction: "down",
      startN: 1,
      startDirection: "across",
      type: "spillover"
    }
  ];
  expect(populatedClues).toEqual(expected);
});

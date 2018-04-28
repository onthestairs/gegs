import { pairs, nonZeroSplits, stripAnswer } from "./index";

it("handles making pairs", () => {
  const xs = [1, 2, 3, 4];
  const calculatedPairs = pairs(xs);
  const expectedPairs = [
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 1],
    [2, 3],
    [2, 4],
    [3, 1],
    [3, 2],
    [3, 4],
    [4, 1],
    [4, 2],
    [4, 3]
  ];
  expect(calculatedPairs).toEqual(expectedPairs);
});

it("handles nonZeroSplits", () => {
  const xs = [1, 2, 3, 4];
  const calculatedSplits = nonZeroSplits(xs);
  const expectedSplits = [[[1], [2, 3, 4]], [[1, 2], [3, 4]], [[1, 2, 3], [4]]];
  expect(calculatedSplits).toEqual(expectedSplits);
});

it("handles stripping answer", () => {
  expect(stripAnswer("viz-a-viz")).toEqual("vizaviz");
  expect(stripAnswer("tony blair")).toEqual("tonyblair");
});

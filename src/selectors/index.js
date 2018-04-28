import { createSelector } from "reselect";

import { pairs, nonZeroSplits, addMissing, stripAnswer } from "../utils";

const getClues = ({ clues }) => clues;
const getClueBank = ({ clueBank }) => clueBank;
const getClueBankInput = ({ clueBankInput }) => clueBankInput;

// populateClues will take the clues on the grid and match them up
// with the clues in the clue bank. returns an array of numbered clues
export const populateClues = (gridClues, clueBank) => {
  let found = [];

  // first check if the answer is a single length
  for (let bankClue of clueBank) {
    for (let gridClue of gridClues) {
      const gridAnswerUpper = gridClue.gridAnswer.toUpperCase();
      const answerString = stripAnswer(bankClue.answer);
      if (gridAnswerUpper === answerString) {
        found.push({
          n: gridClue.n,
          direction: gridClue.direction,
          type: "single",
          clue: bankClue.clue,
          answer: bankClue.answer
        });
        break;
      }
    }

    // now check if the answer spreads across multiple lengths
    const answerWords = bankClue.answer.split(" ");
    if (answerWords.length > 0) {
      for (let [gridClue1, gridClue2] of pairs(gridClues)) {
        for (let [answerWords1, answerWords2] of nonZeroSplits(answerWords)) {
          const answerString1 = stripAnswer(answerWords1.join(""));
          const answerString2 = stripAnswer(answerWords2.join(""));
          const gridAnswerUpper1 = gridClue1.gridAnswer.toUpperCase();
          const gridAnswerUpper2 = gridClue2.gridAnswer.toUpperCase();
          if (
            answerString1 === gridAnswerUpper1 &&
            answerString2 === gridAnswerUpper2
          ) {
            found.push({
              n: gridClue1.n,
              direction: gridClue1.direction,
              type: "start",
              clue: bankClue.clue,
              answer: bankClue.answer
            });
            found.push({
              n: gridClue2.n,
              direction: gridClue2.direction,
              type: "spillover",
              startN: gridClue1.n,
              startDirection: gridClue1.direction
            });
            break;
          }
        }
      }
    }
  }
  return addMissing(
    found,
    gridClues,
    (gridClue, foundClue) =>
      foundClue.n === gridClue.n && foundClue.direction === gridClue.direction
  );
};

export const getPopulatedClues = createSelector(
  [getClues, getClueBank],
  (clues, clueBank) => populateClues(clues, clueBank)
);

export const isClueBankInputAnswerInClueBank = createSelector(
  [getClueBank, getClueBankInput],
  (clueBank, clueBankInput) => {
    const matchingClues = clueBank.filter(bankClue => {
      const bankClueAnswer = stripAnswer(bankClue.answer).toUpperCase();
      const clueInputAnswer = stripAnswer(clueBankInput.answer).toUpperCase();
      return bankClueAnswer === clueInputAnswer;
    });
    return matchingClues.length > 0;
  }
);

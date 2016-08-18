import { createSelector } from 'reselect'

const getClues = ({clues}) => clues;
const getClueBank = ({clueBank}) => clueBank;

const addClues = (clues, clueBank) => {
  return clues.map(clue => {
    const answer = clue.gridAnswer.toUpperCase();
    const filteredClueBank = clueBank.filter(bankClue => {
      const bankClueAnswer = bankClue.answer.replace(/ /g, '');
      return bankClueAnswer === answer;
    });
    if(filteredClueBank.length > 0) {
      return {
        ...clue,
        clue: filteredClueBank[0].clue,
        answer: filteredClueBank[0].answer
      }
    } else {
      return clue
    }
  });
}

export const getPopulatedClues = createSelector(
  [ getClues, getClueBank ],
  (clues, clueBank) => addClues(clues, clueBank)
)

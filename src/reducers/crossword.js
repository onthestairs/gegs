import * as gridUtils from '../grid/grid';

const initialGrid = gridUtils.makeGrid(gridUtils.GRID_SIZE);
const initialState = {
  grid: initialGrid,
  clues: gridUtils.gridClueLocations(initialGrid),
  cursor: [0, 0],
  direction: 'r',
  clueBank: [
    {answer: 'AUSTIN', clue: 'Absolute badman!'}
  ]
}

const DIR_TO_DELTA = {
  'up': [-1, 0],
  'down': [1, 0],
  'left': [0, -1],
  'right': [0, 1]
}

const moveCursor = ([rD, cD], [row, col]) => {
  return [
    Math.min(gridUtils.GRID_SIZE-1, Math.max(0, row + rD)),
    Math.min(gridUtils.GRID_SIZE-1, Math.max(0, col + cD))
  ]
}

const addClues = (clues, clueBank) => {
  return clues.map(clue => {
    const answer = clue.gridAnswer.toUpperCase();
    const filteredClueBank = clueBank.filter(bankClue => {
      const bankClueAnswer = bankClue.answer.replace(/ /g, '');
      console.log(bankClueAnswer, answer);
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

const crossword = (state = initialState, action) => {
  switch (action.type) {

    case 'SET_GRID_CURSOR':
      return {
        ...state,
        cursor: action.cursor
      }

    case 'MOVE_GRID_CURSOR':
      const {cursor} = state;
      const delta = DIR_TO_DELTA[action.direction];
      const newCursor = moveCursor(delta, cursor);
      return {
        ...state,
        cursor: newCursor
      }

    case 'SET_GRID_DIRECTION':
        return {
          ...state,
          direction: action.direction
        }

    case 'SET_GRID_VALUE':
        const {grid, cursor: [row, col], clueBank} = state;
        const newGrid = gridUtils.placeValue(grid, row, col, action.value);
        const clues = gridUtils.gridClueLocations(newGrid);
        const cluesWithClues = addClues(clues, clueBank);
        return {
          ...state,
          grid: newGrid,
          clues: cluesWithClues
        }

    case 'ADD_CLUE_TO_BANK':
        const newClueBankClue = {clue: action.clue, answer: action.answer}
        const newClueBank = [...state.clueBank, newClueBankClue];
        const newCluesWithClues = addClues(state.clues, newClueBank);
        return {
          ...state,
          clueBank: newClueBank,
          clues: newCluesWithClues
        }

    default:
      return state
  }
}

export default crossword

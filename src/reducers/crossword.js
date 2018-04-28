import uuid from "uuid";

import * as gridUtils from "../grid/grid";
import { stripAnswer } from "../utils";

const initialGrid = gridUtils.makeGrid(gridUtils.GRID_SIZE);
const initialCrosswordState = {
  grid: initialGrid,
  clues: gridUtils.gridClueLocations(initialGrid),
  cursor: [0, 0],
  direction: "right",
  name: "Unnamed",
  fixGrid: false,
  clueBank: [{ answer: "AUSTIN", clue: "Absolute badman!" }],
  clueBankInput: {
    clue: "",
    answer: ""
  }
};

const DIR_TO_DELTA = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1]
};

const moveCursor = ([rD, cD], [row, col]) => {
  return [
    Math.min(gridUtils.GRID_SIZE - 1, Math.max(0, row + rD)),
    Math.min(gridUtils.GRID_SIZE - 1, Math.max(0, col + cD))
  ];
};

const oppositeDirection = direction => {
  const mapping = {
    down: "up",
    up: "down",
    left: "right",
    right: "left"
  };
  return mapping[direction];
};

const switchCursorDirection = currentDirection => {
  return currentDirection === "right" ? "down" : "right";
};

// Tells us if a given square is available to be written in (i.e. not blacked
// out). Returns false for off grid squares
const isOpen = (grid, row, col) => {
  const rowInRange = row >= 0 && row < gridUtils.GRID_SIZE;
  const colInRange = col >= 0 && col < gridUtils.GRID_SIZE;
  return rowInRange && colInRange && !(grid[row][col] === ".");
};

// Attempt to place the cursor in a direction aligning with way the word the
// user clicked on is going - that way they don't have to correct it.
const cursorDirection = (grid, row, col) => {
  if (!isOpen(grid, row, col + 1)) {
    return "down"; // Down clue
  } else if (!isOpen(grid, row + 1, col)) {
    return "right"; // Across clue
  }
  // Now we must be in an across clue AND a down clue. If we're at the start of
  // a down clue, return down, else return across.
  return isOpen(grid, row - 1, col) ? "right" : "down";
};

const crossword = (state = initialCrosswordState, action) => {
  const { grid, cursor: [row, col], clueBank, direction, fixGrid } = state;

  switch (action.type) {
    case "SET_GRID_CURSOR": {
      const { cursor: [newRow, newCol] } = action;
      var newDirection = direction;
      if (newRow === row && newCol === col) {
        newDirection = switchCursorDirection(direction);
      } else {
        newDirection = cursorDirection(grid, newRow, newCol);
      }
      return {
        ...state,
        cursor: [newRow, newCol],
        direction: newDirection
      };
    }

    case "MOVE_GRID_CURSOR": {
      const delta = DIR_TO_DELTA[action.direction];
      const newCursor = moveCursor(delta, [row, col]);
      const newDirection =
        action.direction === "down" || action.direction === "right"
          ? action.direction
          : direction;
      return {
        ...state,
        cursor: newCursor,
        direction: newDirection
      };
    }

    case "MOVE_GRID_BACK": {
      const newGrid = gridUtils.placeValue(grid, row, col, " ", fixGrid);
      const clues = gridUtils.gridClueLocations(newGrid);
      const delta = DIR_TO_DELTA[oppositeDirection(direction)];
      const newCursor = moveCursor(delta, [row, col]);
      return {
        ...state,
        grid: newGrid,
        clues: clues,
        cursor: newCursor
      };
    }

    case "SET_GRID_VALUE": {
      const newGrid = gridUtils.placeValue(
        grid,
        row,
        col,
        action.value,
        fixGrid
      );
      const clues = gridUtils.gridClueLocations(newGrid);
      const delta = DIR_TO_DELTA[direction];
      const newCursor = moveCursor(delta, [row, col]);
      return {
        ...state,
        grid: newGrid,
        clues: clues,
        cursor: newCursor
      };
    }

    case "CHANGE_CLUE_BANK_CLUE": {
      const newClueBankInput = {
        ...state.clueBankInput,
        clue: action.clue
      };
      return {
        ...state,
        clueBankInput: newClueBankInput
      };
    }

    case "CHANGE_CLUE_BANK_ANSWER": {
      const strictAnswer = action.answer
        .replace(/[^a-zA-Z -]/g, "")
        .toUpperCase();
      const newClueBankInput = {
        ...state.clueBankInput,
        answer: strictAnswer
      };
      return {
        ...state,
        clueBankInput: newClueBankInput
      };
    }

    case "ADD_CLUE_TO_BANK":
      const newClueBankClue = {
        clue: action.clue,
        answer: action.answer,
        id: uuid.v4()
      };
      const newClueBank = [...clueBank, newClueBankClue];
      const newClueBankInput = {
        clue: "",
        answer: ""
      };
      return {
        ...state,
        clueBankInput: newClueBankInput,
        clueBank: newClueBank
      };

    case "EDIT_CLUE_IN_BANK": {
      const newClueBankClue = {
        clue: action.clue,
        answer: action.answer,
        id: uuid.v4()
      };
      const newClueBank = clueBank.map(clue => {
        const clueAnswer = stripAnswer(clue.answer).toUpperCase();
        const actionAnswer = stripAnswer(action.answer).toUpperCase();
        if (clueAnswer === actionAnswer) {
          return {
            ...clue,
            clue: action.clue,
            answer: action.answer
          };
        } else {
          return clue;
        }
      });
      const newClueBankInput = {
        clue: "",
        answer: ""
      };
      return {
        ...state,
        clueBankInput: newClueBankInput,
        clueBank: newClueBank
      };
    }

    case "START_EDITING_CLUE_IN_BANK": {
      const clue = clueBank.filter(clue => clue.id === action.clueId)[0];
      const newClueBankInput = {
        clue: clue.clue,
        answer: clue.answer
      };
      return {
        ...state,
        clueBankInput: newClueBankInput
      };
    }

    case "DELETE_CLUE_FROM_BANK": {
      const newClueBank = clueBank.filter(clue => clue.id !== action.clueId);
      return {
        ...state,
        clueBank: newClueBank
      };
    }

    case "SET_FIX_GRID_STATUS":
      return {
        ...state,
        fixGrid: action.fixGridstatus
      };

    case "CHANGE_CROSSWORD_NAME":
      return {
        ...state,
        name: action.name
      };

    default:
      return state;
  }
};

const crosswordId = uuid.v4();
const initialCrosswordsState = {
  currentCrosswordId: crosswordId,
  crosswords: {
    [crosswordId]: initialCrosswordState
    // 2: initialCrosswordState
  },
  isNavOpen: false
};

const crosswords = (state = initialCrosswordsState, action) => {
  const { currentCrosswordId, crosswords } = state;
  switch (action.type) {
    case "SELECT_CROSSWORD":
      return {
        ...state,
        currentCrosswordId: action.crosswordId
      };
    case "DELETE_CROSSWORD": {
      let newCrosswords = crosswords;
      delete newCrosswords[action.crosswordId];
      const newCurrentCrosswordId = Object.keys(newCrosswords)[0];
      return {
        ...state,
        currentCrosswordId: newCurrentCrosswordId,
        crosswords: newCrosswords
      };
    }
    case "NEW_CROSSWORD": {
      const crosswordId = uuid.v4();
      return {
        ...state,
        currentCrosswordId: crosswordId,
        crosswords: {
          ...crosswords,
          [crosswordId]: initialCrosswordState
        }
      };
    }
    case "SET_NAV_OPEN":
      return {
        ...state,
        isNavOpen: action.isOpen
      };
    default: {
      const currentCrossword = crosswords[currentCrosswordId];
      const newCurrentCrossword = crossword(currentCrossword, action);
      let newCrosswords = crosswords;
      newCrosswords[currentCrosswordId] = newCurrentCrossword;
      return {
        ...state,
        crosswords: newCrosswords
      };
    }
  }
};

export default crosswords;

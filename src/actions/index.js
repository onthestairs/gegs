export const setGridCursor = cursor => {
  return {
    type: "SET_GRID_CURSOR",
    cursor
  };
};

export const moveGridCursor = direction => {
  return {
    type: "MOVE_GRID_CURSOR",
    direction
  };
};

export const setGridValue = value => {
  return {
    type: "SET_GRID_VALUE",
    value
  };
};

export const moveGridDirection = direction => {
  return {
    type: "MOVE_GRID_DIRECTION",
    direction
  };
};

export const moveGridBack = () => {
  return {
    type: "MOVE_GRID_BACK"
  };
};

export const changeClueBankAnswer = answer => {
  return {
    type: "CHANGE_CLUE_BANK_ANSWER",
    answer
  };
};

export const changeClueBankClue = clue => {
  return {
    type: "CHANGE_CLUE_BANK_CLUE",
    clue
  };
};

export const addClueToBank = (answer, clue) => {
  return {
    type: "ADD_CLUE_TO_BANK",
    answer,
    clue
  };
};

export const editClueInBank = (answer, clue) => {
  return {
    type: "EDIT_CLUE_IN_BANK",
    answer,
    clue
  };
};

export const startEditingClueInBank = clueId => {
  return {
    type: "START_EDITING_CLUE_IN_BANK",
    clueId
  };
};

export const deleteClueFromBank = clueId => {
  return {
    type: "DELETE_CLUE_FROM_BANK",
    clueId
  };
};

export const selectCrossword = crosswordId => {
  return {
    type: "SELECT_CROSSWORD",
    crosswordId
  };
};

export const newCrossword = () => {
  return {
    type: "NEW_CROSSWORD"
  };
};

export const deleteCrossword = crosswordId => {
  return {
    type: "DELETE_CROSSWORD",
    crosswordId
  };
};

export const setFixGridStatus = fixGridstatus => {
  return {
    type: "SET_FIX_GRID_STATUS",
    fixGridstatus
  };
};

export const changeCrosswordName = name => {
  return {
    type: "CHANGE_CROSSWORD_NAME",
    name
  };
};

export const setNavOpen = isOpen => {
  return {
    type: "SET_NAV_OPEN",
    isOpen
  };
};

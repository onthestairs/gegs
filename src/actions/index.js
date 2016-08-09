export const setGridCursor = (cursor) => {
  return {
    type: 'SET_GRID_CURSOR',
    cursor
  }
}

export const moveGridCursor = (direction) => {
  return {
    type: 'MOVE_GRID_CURSOR',
    direction
  }
}

export const setGridValue = (value) => {
  return {
    type: 'SET_GRID_VALUE',
    value
  }
}

export const moveGridDirection = (direction) => {
  return {
    type: 'MOVE_GRID_DIRECTION',
    direction
  }
}

export const moveGridBack = () => {
  return {
    type: 'MOVE_GRID_BACK'
  }
}

export const addClueToBank = (answer, clue) => {
  return {
    type: 'ADD_CLUE_TO_BANK',
    answer,
    clue
  }
}

export const selectCrossword = (crosswordId) => {
  return {
    type: 'SELECT_CROSSWORD',
    crosswordId
  }
}

export const newCrossword = () => {
  return {
    type: 'NEW_CROSSWORD'
  }
}

export const setFixGridStatus = (fixGridstatus) => {
  return {
    type: 'SET_FIX_GRID_STATUS',
    fixGridstatus
  }
}

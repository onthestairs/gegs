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

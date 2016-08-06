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

export const setGridDirection = (direction) => {
  return {
    type: 'SET_GRID_DIRECTION',
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

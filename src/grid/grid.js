import Immutable from 'immutable';

export const GRID_SIZE = 15;

export const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
export const UPPER_ALPHABET = ALPHABET.toUpperCase();

export const isAlpha = (value) => {
  return (ALPHABET + UPPER_ALPHABET).indexOf(value) !== -1;
}

export const isLegalValue = (value) => {
  const allLegalValues = ALPHABET + UPPER_ALPHABET + '. ';
  return allLegalValues.indexOf(value) !== -1;
}

export const makeGrid = (size, empty=' ') => {
  return Immutable.Repeat(Immutable.Repeat(empty, size), size).toJS();
}

export const getOtherRowCol = (row, col) => {
  return [GRID_SIZE-row-1, GRID_SIZE-col-1];
}

export const placeValue = (grid, row, col, value) => {
  grid[row][col] = value;
  const [otherRow, otherCol] = getOtherRowCol(row, col);
  const otherValue = grid[otherRow][otherCol];
  if(value === '.') {
    grid[otherRow][otherCol] = value;
  } else if(isAlpha(value)) {
    if(!isAlpha(otherValue)) {
      grid[otherRow][otherCol] = '-';
    }
  } else { // blank
    if(otherValue === '.' || otherValue === '-') {
      grid[otherRow][otherCol] = ' ';
    } else if(isAlpha(otherValue)) {
        grid[row][col] = '-';
    }
  }
  return grid;
}

export const isDownClue = (grid, [row, col]) => {
  const currentNumber = grid[row][col];
  if(currentNumber === '.') {
    return false;
  }
  if(row > 0 && row < (GRID_SIZE-1)) {
    const prev = grid[row-1][col];
    const next = grid[row+1][col];
    if(prev === '.' && next !== '.') {
      return true;
    }
  };
  if(row === 0) {
    const next = grid[row+1][col];
    if(next !== '.') {
      return true;
    };
  }
  return false;
}


export const isAcrossClue = (grid, [row, col]) => {
  const currentNumber = grid[row][col];
  if(currentNumber === '.') {
    return false;
  }
  if(col > 0 && col < (GRID_SIZE-1)) {
    const prev = grid[row][col-1];
    const next = grid[row][col+1];
    if(prev === '.' && next !== '.') {
      return true;
    }
  };
  if(col === 0) {
    const next = grid[row][col+1];
    if(next !== '.') {
      return true;
    };
  }
  return false;
}


export const downClueDetails = (grid, [row, col]) => {
  let answer = '';
  let _row = row;
  while(_row < GRID_SIZE && grid[_row][col] !== '.') {
    answer += grid[_row][col];
    _row += 1;
  }
  return {
    position: [row, col],
    answer: answer
  }
}

export const acrossClueDetails = (grid, [row, col]) => {
  let answer = '';
  let _col = col;
  while(_col < GRID_SIZE && grid[row][_col] !== '.') {
    answer += grid[row][_col];
    _col += 1;
  }
  return {
    position: [row, col],
    answer: answer
  }
}


export const gridClueLocations = (grid) => {
  let clueLocations = [];
  let n = 1;
  for(let row=0; row<GRID_SIZE; row++) {
    for(let col=0; col<GRID_SIZE; col++) {
      const downClue = isDownClue(grid, [row, col]);
      const acrossClue = isAcrossClue(grid, [row, col]);
      if(downClue) {
        const clueDetails = downClueDetails(grid, [row, col]);
        clueDetails.n = n;
        clueDetails.direction = 'down';
        clueLocations.push(clueDetails)
      }
      if(acrossClue) {
        const clueDetails = acrossClueDetails(grid, [row, col]);
        clueDetails.n = n;
        clueDetails.direction = 'across';
        clueLocations.push(clueDetails)
      }
      if(downClue || acrossClue) {
        n += 1;
      }
    }
  }
  return clueLocations;
}

export const positionToNumber = (clues, [row, col]) => {
  const goodClues = clues.filter(clue => {
    const {position: [clueRow, clueCol]} = clue;
    return clueRow === row && clueCol === col;
  })
  if(goodClues.length > 0) {
    return goodClues[0].n;
  }
  return null;
}

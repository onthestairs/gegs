import React, { Component } from 'react';
import Cell from './Cell';
import Clues from './Clues';

import Immutable from 'immutable';
import keydown, { Keys } from 'react-keydown';

const { up, down, left, right } = Keys;

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const UPPER_ALPHABET = ALPHABET.toUpperCase();

const isAlpha = (value) => {
  return (ALPHABET + UPPER_ALPHABET).indexOf(value) !== -1;
}

const GRID_SIZE = 15;
const makeGrid = (size, empty=' ') => {
  return Immutable.Repeat(Immutable.Repeat(empty, size), size).toJS();
}

const DIR_TO_DELTA = {
  'u': [-1, 0],
  'd': [1, 0],
  'l': [0, -1],
  'r': [0, 1]
}

const moveFocussed = ([rD, cD], {row, col}) => {
  return {
    row: Math.min(GRID_SIZE-1, Math.max(0, row + rD)),
    col: Math.min(GRID_SIZE-1, Math.max(0, col + cD))
  }
}

const isLegalValue = (value) => {
  const allLegalValues = ALPHABET + UPPER_ALPHABET + '. ';
  return allLegalValues.indexOf(value) !== -1;
}

const getOtherRowCol = (row, col) => {
  return [GRID_SIZE-row-1, GRID_SIZE-col-1];
}

const placeValue = (grid, row, col, value) => {
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

const isDownClue = (grid, [row, col]) => {
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
  if(row == 0) {
    const next = grid[row+1][col];
    if(next !== '.') {
      return true;
    };
  }
  return false;
}
const isAcrossClue = (grid, [row, col]) => {
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
  if(col == 0) {
    const next = grid[row][col+1];
    if(next !== '.') {
      return true;
    };
  }
  return false;
}

const downClueDetails = (grid, [row, col]) => {
  let answer = '';
  let _row = row;
  while(_row < GRID_SIZE && grid[_row][col] !== '.') {
    answer += grid[_row][col];
    _row = _row + 1;
  }
  return {
    position: [row, col],
    answer: answer
  }
}

const acrossClueDetails = (grid, [row, col]) => {
  let answer = '';
  let _col = col;
  while(_col < GRID_SIZE && grid[row][_col] !== '.') {
    answer += grid[row][_col];
    _col = _col + 1;
  }
  return {
    position: [row, col],
    answer: answer
  }
}

const gridClueLocations = (grid) => {
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
        n = n + 1;
      }
    }
  }
  return clueLocations;
}

const positionToNumber = (clues, [row, col]) => {
  const goodClues = clues.filter(clue => {
    const {position: [clueRow, clueCol]} = clue;
    return clueRow === row && clueCol === col;
  })
  if(goodClues.length > 0) {
    return goodClues[0].n;
  }
  return null;
}

class Grid extends Component {

  constructor(props) {
    super(props);
    const initialGrid = makeGrid(GRID_SIZE);
    console.log(initialGrid);
    this.state = {
      grid: initialGrid,
      focussed: {
        row: 0,
        col: 0
      },
      direction: 'r'
    };
  }

  setFocussed([row, col]) {
    this.setState({
      focussed: {
        row: row,
        col: col,
      }
    });
  }

  componentWillReceiveProps( { keydown } ) {
    if ( keydown.event ) {
      keydown.event.preventDefault();
      const {focussed} = this.state;
       if ( keydown.event.which === up ) {
         const newFocussed = moveFocussed(DIR_TO_DELTA['u'], focussed)
         this.setState({
           focussed: newFocussed,
          //  direction: 'u'
         });
       }
       else if ( keydown.event.which === down ) {
         const newFocussed = moveFocussed(DIR_TO_DELTA['d'], focussed)
         this.setState({
           focussed: newFocussed,
           direction: 'd'
         });
       }
       else if ( keydown.event.which === left ) {
         const newFocussed = moveFocussed(DIR_TO_DELTA['l'], focussed)
         this.setState({
           focussed: newFocussed,
          //  direction: 'l'
         });
       }
       else if ( keydown.event.which === right ) {
         const newFocussed = moveFocussed(DIR_TO_DELTA['r'], focussed)
         this.setState({
           focussed: newFocussed,
           direction: 'r'
         });
       }
       else {
         const {grid, focussed: {row, col}, direction} = this.state;
         const value = keydown.event.key;
         if(isLegalValue(value)) {
           const newGrid = placeValue(grid, row, col, value);
           const newFocussed = moveFocussed(DIR_TO_DELTA[direction], focussed)
           this.setState({
             grid: newGrid,
             focussed: newFocussed
           });
         }
       }

    }

  }

  render() {
    const {grid, focussed} = this.state;
    const clues = gridClueLocations(grid);
    console.log(clues);
    const cells = grid.map((row, i) => {
      const rowCells = row.map((cell, j) => {
        const {row: focussedRow, col: focussedCol} = focussed;
        const isFocussed = i == focussedRow && j == focussedCol;
        const number = positionToNumber(clues, [i, j]);
        const onClickHandler = this.setFocussed.bind(this, [i, j]);
        return <Cell val={cell} isFocussed={isFocussed} number={number} onClickHandler={onClickHandler}/>
      });
      return (<div className="row" key={i}>{rowCells}</div>);
    });

    return (
      <div>
        <div className="grid">
          {cells}
        </div>
        <div className="clues">
          <h3>Clues</h3>
          <Clues clues={clues}/>
        </div>
      </div>
    );
  }
}

export default keydown( Grid );

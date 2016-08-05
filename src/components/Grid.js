import React, { Component } from 'react';
import Cell from './Cell';

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

const needsNumber = (grid, [row, col]) => {
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
    return next !== '.';
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
    return next !== '.';
  }
  return false;
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
    let n = 1;
    const cells = grid.map((row, i) => {
      const rowCells = row.map((cell, j) => {
        const {row: focussedRow, col: focussedCol} = focussed;
        const isFocussed = i == focussedRow && j == focussedCol;
        const doesNeedNumber = needsNumber(grid, [i, j]);
        let number;
        if(doesNeedNumber) {
          number = n;
          n = n + 1;
        } else {
          number = null;
        }
        const onClickHandler = this.setFocussed.bind(this, [i, j]);
        return <Cell val={cell} isFocussed={isFocussed} number={number} onClickHandler={onClickHandler}/>
      });
      return (<div className="row" key={i}>{rowCells}</div>);
    });

    return (
      <div className="grid">
        {cells}
      </div>
    );
  }
}

export default keydown( Grid );

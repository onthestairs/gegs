import React, { Component } from 'react';
import Cell from './Cell';
import * as gridUtils from '../grid/grid';

import keydown, { Keys } from 'react-keydown';

const { up, down, left, right } = Keys;

const DIR_TO_DELTA = {
  'u': [-1, 0],
  'd': [1, 0],
  'l': [0, -1],
  'r': [0, 1]
}

const moveFocussed = ([rD, cD], [row, col]) => {
  return [
    Math.min(gridUtils.GRID_SIZE-1, Math.max(0, row + rD)),
    Math.min(gridUtils.GRID_SIZE-1, Math.max(0, col + cD))
  ]
}

class Grid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      focussed: [0, 0],
      direction: 'r'
    };
  }

  componentWillReceiveProps({keydown}) {
    if (keydown.event) {
      this.onGridKeypress(keydown.event);
    }
  }

  setFocussed([row, col]) {
    this.setState({
      focussed: [row, col]
    });
  }

  onGridKeypress(event) {

    event.preventDefault();
    const {grid} = this.props;
    const {focussed: [row, col], direction} = this.state;
     if ( event.which === up ) {
       const newFocussed = moveFocussed(DIR_TO_DELTA['u'], [row, col]);
       this.setState({
         focussed: newFocussed,
        //  direction: 'u'
       });
     }
     else if ( event.which === down ) {
       const newFocussed = moveFocussed(DIR_TO_DELTA['d'], [row, col]);
       this.setState({
         focussed: newFocussed,
         direction: 'd'
       });
     }
     else if ( event.which === left ) {
       const newFocussed = moveFocussed(DIR_TO_DELTA['l'], [row, col]);
       this.setState({
         focussed: newFocussed,
        //  direction: 'l'
       });
     }
     else if ( event.which === right ) {
       const newFocussed = moveFocussed(DIR_TO_DELTA['r'], [row, col]);
       console.log(newFocussed);
       this.setState({
         focussed: newFocussed,
         direction: 'r'
       });
     }
     else {
       const value = event.key;
       if(gridUtils.isLegalValue(value)) {
         const newGrid = gridUtils.placeValue(grid, row, col, value);
         const newFocussed = moveFocussed(DIR_TO_DELTA[direction], [row, col]);
         const {setGrid} = this.props;
         setGrid(newGrid);
         this.setState({
           focussed: newFocussed
         });
       }
     }
  }

  render() {

    const {grid} = this.props;
    const {focussed} = this.state;
    const clues = gridUtils.gridClueLocations(grid);

    const cells = grid.map((row, i) => {
      const rowCells = row.map((cell, j) => {
        const [focussedRow, focussedCol] = focussed;
        const isFocussed = i === focussedRow && j === focussedCol;
        const number = gridUtils.positionToNumber(clues, [i, j]);
        return <Cell val={cell} isFocussed={isFocussed} number={number}
                     key={[[i, j]]}
                     onClickHandler={() => this.setFocussed([i, j])}/>
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

export default keydown(Grid);
// export default Grid;

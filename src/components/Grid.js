import React from 'react';
import Cell from './Cell';
import * as gridUtils from '../grid/grid';
import { connect } from 'react-redux'
import { setGridValue, moveGridCursor } from '../actions'

import {HotKeys} from 'react-hotkeys';

const keyMap = {
  'entry': gridUtils.ALL_LEGAL_VALUES.split(""),
  'direction': ['up', 'down', 'left', 'right']
}

const Grid = ({grid, cursor, onDirectionPressed, onEntryPressed}) => {

  const cells = grid.map((row, i) => {
    const rowCells = row.map((cell, j) => {
      return <Cell value={cell} row={i} col={j} />
    });
    return (<div className="row" key={i}>{rowCells}</div>);
  });

  const handlers = {
    'entry': onEntryPressed,
    'direction': onDirectionPressed
  };

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      <div className="grid">
        {cells}
      </div>
    </HotKeys>
  );

}

const mapStateToProps = ({crossword}) => {
  return {
    grid: crossword.grid,
    cursor: crossword.cursor
  }
}

const mapDispatchToProps = (dispatch, ) => {
  return {
    onDirectionPressed: (e) => {
      e.preventDefault();
      const keyToDir = {
        40: 'down',
        39: 'right',
        37: 'left',
        38: 'up'
      }
      const dir = keyToDir[e.which];
      dispatch(moveGridCursor(dir));
    },
    onEntryPressed: (e) => {
      e.preventDefault();
      dispatch(setGridValue(e.key));
    }
  }
}

const ActiveGrid = connect(
  mapStateToProps, mapDispatchToProps
)(Grid)

export default ActiveGrid

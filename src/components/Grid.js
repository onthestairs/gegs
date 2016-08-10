import React from 'react';
import Cell from './Cell';
import * as gridUtils from '../grid/grid';
import { connect } from 'react-redux';
import {setGridValue, moveGridCursor, moveGridBack} from '../actions';
import {currentCrosswordState} from '../reducers/utils';
import Name from './grid/Name';
import Controls from './grid/Controls';

import {HotKeys} from 'react-hotkeys';

const keyMap = {
  'entry': gridUtils.ALL_LEGAL_VALUES.split("").concat(['space']),
  'direction': ['up', 'down', 'left', 'right'],
  'backspace': ['backspace']
}

const Grid = ({grid, cursor, onDirectionPressed, onEntryPressed, onBackspacePressed}) => {

  const cells = grid.map((row, i) => {
    const rowCells = row.map((cell, j) => {
      return <Cell value={cell} row={i} col={j} key={[i, j]}/>
    });
    return (<div className="row" key={i}>{rowCells}</div>);
  });

  const handlers = {
    'entry': onEntryPressed,
    'direction': onDirectionPressed,
    'backspace': onBackspacePressed
  };

  return (
    <div>
      <Name />
      <HotKeys keyMap={keyMap} handlers={handlers}>
        <div className="grid">
          {cells}
        </div>
      </HotKeys>
      <Controls />
    </div>
  );

}

const mapStateToProps = (state) => {
  const {grid, cursor} = currentCrosswordState(state);
  return {
    grid,
    cursor
  }
}

const mapDispatchToProps = (dispatch) => {
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
      const SPACE_KEY = 32;
      const BACKSPACE_KEY = 8;
      const value = (e.keyCode === SPACE_KEY || e.keyCode === BACKSPACE_KEY) ? ' ' : e.key;
      dispatch(setGridValue(value));
      e.preventDefault();
    },
    onBackspacePressed: (e) => {
      e.preventDefault();
      dispatch(moveGridBack());
    },
  }
}

const ActiveGrid = connect(
  mapStateToProps, mapDispatchToProps
)(Grid)

export default ActiveGrid

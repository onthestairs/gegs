import React from 'react';
import { connect } from 'react-redux'
import { setGridCursor } from '../actions'

import * as gridUtils from '../grid/grid';


const CellComponent = ({value, row, col, number, isFocussed, onClickHandler}) => {
    let classes = ['cell'];
    let contents, numberSpan;
    if (value === '.') {
       classes.push('shaded')
       contents = '.';
    } else {
       contents = value.toUpperCase();
    }
    if(isFocussed) {
      classes.push('focussed');
    }
    if(number !== null) {
      numberSpan = <span className="clueNumber">{number}</span>
    } else {
      numberSpan = null;
    }
    const classNames = classes.join(' ');
    return (
      <div className={classNames} onClick={() => onClickHandler([row, col])}>{numberSpan}{contents}</div>
    );
}

const mapStateToProps = ({crossword: {clues, cursor: [cursorRow, cursorCol]}}, {value, row, col}) => {
  const number = gridUtils.positionToNumber(clues, [row, col]);
  const isFocussed = row === cursorRow && col === cursorCol;
  return {
    number,
    isFocussed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickHandler: (position) => {
      dispatch(setGridCursor(position))
    }
  }
}

const Cell = connect(
  mapStateToProps,
  mapDispatchToProps
)(CellComponent);

export default Cell

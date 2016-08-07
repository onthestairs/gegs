import React from 'react';
import { connect } from 'react-redux'
import { setGridCursor } from '../actions'

import * as gridUtils from '../grid/grid';


const CellComponent = ({value, row, col, number, direction, isFocussed, isShaded, onClickHandler}) => {
    let classes = ['cell'];
    let contents, numberSpan;
    if (isShaded) {
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
    const directionSpan = isFocussed ? <div className={'arrow ' + direction}></div> : null;
    return (
      <div className={classNames} onClick={() => onClickHandler([row, col])}>
        {numberSpan}
        {directionSpan}
        {contents}
      </div>
    );
}

const mapStateToProps = ({crossword: {clues, direction, cursor: [cursorRow, cursorCol]}}, {value, row, col}) => {
  const number = gridUtils.positionToNumber(clues, [row, col]);
  const isFocussed = row === cursorRow && col === cursorCol;
  const isShaded = value === '.';
  return {
    number,
    isFocussed,
    isShaded,
    direction
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

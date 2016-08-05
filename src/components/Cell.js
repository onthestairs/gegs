import React, { Component } from 'react';

class Cell extends Component {

  render() {
    const {val, isFocussed, number, onClickHandler} = this.props;
    let classes = ['cell'];
    let contents, numberSpan;
    if (val === '.') {
       classes.push('shaded')
       contents = '.';
    } else {
       contents = val.toUpperCase();
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
      <div className={classNames} onClick={onClickHandler}>{numberSpan}{contents}</div>
    );
  }
}

export default Cell;

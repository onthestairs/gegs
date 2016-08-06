import React from 'react';
import { connect } from 'react-redux'

const renderClues = (clues) => {
  return clues.map(clue => {
    return <li value={clue.n} key={clue.n + clue.direction}> {clue.clue} ({clue.answer.length})</li>
  });
}

const CluesComponent = ({clues}) => {

  const acrossClues = clues.filter(clue => clue.direction === 'across');
  const acrossCluesLis = renderClues(acrossClues);
  const downClues = clues.filter(clue => clue.direction === 'down');
  const downCluesLis = renderClues(downClues);
  return (
    <div>
      <div>
        <div className="clueList">
          <h3>Across</h3>
          <ol>{acrossCluesLis}</ol>
        </div>
        <div className="clueList">
          <h3>Down</h3>
          <ol>{downCluesLis}</ol>
        </div>
      </div>
    </div>
  );

}

const mapStateToProps = ({crossword: {clues, cursor: [cursorRow, cursorCol]}}, {value, row, col}) => {
  return {
    clues
  }
}

const Clues = connect(
  mapStateToProps,
  {}
)(CluesComponent);


export default Clues;

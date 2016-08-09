import React from 'react';
import { connect } from 'react-redux';
import {currentCrosswordState} from '../reducers/utils';

const renderClues = (clues) => {
  return clues.map(clue => {
    let lengths;
    if(clue.answer) {
      lengths = clue.answer.split(" ").map(x => x.length);
    } else {
      lengths = [clue.gridAnswer.length];
    }
    return <li value={clue.n} key={clue.n + clue.direction}> {clue.clue} ({lengths.join(",")})</li>
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

const mapStateToProps = (state, {value, row, col}) => {
  const {clues} = currentCrosswordState(state);
  return {
    clues
  }
}

const Clues = connect(
  mapStateToProps,
  {}
)(CluesComponent);


export default Clues;

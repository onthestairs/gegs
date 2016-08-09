import React from 'react';
import { connect } from 'react-redux'
import AddClueToBank from './AddClueToBank';
import {currentCrosswordState} from '../reducers/utils';

const renderClue = (clue) => {
  return <li key={clue.answer + clue.clue}><em>{clue.answer}</em><br /><span>{clue.clue}</span></li>;
}

const ClueBankComponent = ({clues}) => {
  const clueLis = clues.reverse().map(renderClue);
  return (
    <div>
      <h3>Clue bank</h3>
      <AddClueToBank />
      <ul>{clueLis}</ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(currentCrosswordState(state));
  const {clueBank} = currentCrosswordState(state);
  return {
    clues: clueBank
  }
}


const ClueBank = connect(
  mapStateToProps,
  {}
)(ClueBankComponent);


export default ClueBank;

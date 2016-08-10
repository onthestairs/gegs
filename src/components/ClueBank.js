import React from 'react';
import { connect } from 'react-redux'
import {deleteClueFromBank} from '../actions';
import AddClueToBank from './AddClueToBank';
import {currentCrosswordState} from '../reducers/utils';

const renderClue = (clue, dispatch) => {
  return (
    <li key={clue.answer + clue.clue}>
      <em>{clue.answer}</em>
      <br />
      <span>{clue.clue}</span>
      <br />
      <a className="deleteClue" onClick={(e) => dispatch(deleteClueFromBank(clue.id))}>
        <small>(Delete)</small>
      </a>
    </li>
  );
}

const ClueBankComponent = ({clues, dispatch}) => {
  const clueLis = clues.reverse().map(clue => renderClue(clue, dispatch));
  return (
    <div>
      <h3>Clue bank</h3>
      <AddClueToBank />
      <ul>{clueLis}</ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  const {clueBank} = currentCrosswordState(state);
  return {
    clues: clueBank
  }
}


const ClueBank = connect(
  mapStateToProps,
)(ClueBankComponent);


export default ClueBank;

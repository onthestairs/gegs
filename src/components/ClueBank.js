import React from 'react';
import { connect } from 'react-redux'
import AddClueToBank from './AddClueToBank';

const renderClue = (clue) => {
  return <li key={clue.answer + clue.clue}><em>{clue.answer}</em><br /><span>{clue.clue}</span></li>;
}

const ClueBankComponent = ({clues}) => {
  const clueLis = clues.reverse().map(renderClue);
  return (
    <div>
      <AddClueToBank />
      <ul>{clueLis}</ul>
    </div>
  )
}

const mapStateToProps = ({crossword: {clueBank}}) => {
  return {
    clues: clueBank
  }
}


const ClueBank = connect(
  mapStateToProps,
  {}
)(ClueBankComponent);


export default ClueBank;

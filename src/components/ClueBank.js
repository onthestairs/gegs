import React from "react";
import { connect } from "react-redux";
import { deleteClueFromBank, startEditingClueInBank } from "../actions";
import AddClueToBank from "./AddClueToBank";
import { currentCrosswordState } from "../reducers/utils";

const renderClue = (clue, dispatch) => {
  return (
    <li key={clue.answer + clue.clue}>
      <em>{clue.answer}</em>
      <br />
      <span>{clue.clue}</span>
      <br />
      <small className="clueActions">
        <a
          className="editClue"
          onClick={e => dispatch(startEditingClueInBank(clue.id))}
        >
          Edit
        </a>{" "}
        /{" "}
        <a
          className="deleteClue"
          onClick={e => dispatch(deleteClueFromBank(clue.id))}
        >
          Delete
        </a>
      </small>
    </li>
  );
};

const ClueBankComponent = ({ clues, dispatch }) => {
  const clueLis = clues.reverse().map(clue => renderClue(clue, dispatch));
  return (
    <div>
      <AddClueToBank />
      <ul>{clueLis}</ul>
    </div>
  );
};

const mapStateToProps = state => {
  const { clueBank } = currentCrosswordState(state);
  return {
    clues: clueBank
  };
};

const ClueBank = connect(mapStateToProps)(ClueBankComponent);

export default ClueBank;

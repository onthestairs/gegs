import React from "react";
import { connect } from "react-redux";

import {
  addClueToBank,
  editClueInBank,
  changeClueBankAnswer,
  changeClueBankClue
} from "../actions";
import { isClueBankInputAnswerInClueBank } from "../selectors";
import { currentCrosswordState } from "../reducers/utils";

const AddClueToBankComponent = ({ clue, answer, alreadyInBank, dispatch }) => {
  const buttonText = alreadyInBank ? "Edit Clue" : "Add Clue";
  const submitAction = alreadyInBank ? editClueInBank : addClueToBank;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!answer.trim() || !clue.trim()) {
            return;
          }
          dispatch(submitAction(answer.toUpperCase(), clue));
        }}
      >
        <input
          placeholder="Answer"
          className="answerInput"
          value={answer}
          onChange={e => dispatch(changeClueBankAnswer(e.target.value))}
        />
        <input
          placeholder="Clue"
          value={clue}
          onChange={e => dispatch(changeClueBankClue(e.target.value))}
        />
        <button type="submit" className="addClueButton">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  const crossword = currentCrosswordState(state);
  const alreadyInBank = isClueBankInputAnswerInClueBank(crossword);
  const { clueBankInput } = crossword;
  const clue = clueBankInput ? clueBankInput.clue : "";
  const answer = clueBankInput ? clueBankInput.answer : "";
  return {
    clue,
    answer,
    alreadyInBank
  };
};

const AddClueToBank = connect(mapStateToProps)(AddClueToBankComponent);

export default AddClueToBank;

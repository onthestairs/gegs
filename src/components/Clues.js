import React from "react";
import { connect } from "react-redux";
import { currentCrosswordState } from "../reducers/utils";
import { getPopulatedClues } from "../selectors";

const makeLengthString = answer => {
  const words = answer.split(" ");
  const wordStrings = words.map(word => {
    const bits = word.split("-");
    return bits.map(bit => bit.length).join("-");
  });
  return "(" + wordStrings.join(",") + ")";
};

const renderClues = clues => {
  return clues.map(clue => {
    // we need to decide on these three things but it depends on the type of clue
    let clueText = "";
    let lengthString = "";
    let classes = "";

    switch (clue.type) {
      // this is a clue where we actually want to show the surface
      case "single":
      case "start":
        clueText = clue.clue;
        lengthString = makeLengthString(clue.answer);
        break;
      // a spillover clue so reference the original
      case "spillover":
        clueText = `See ${clue.startN} ${clue.startDirection}`;
        classes = "spillover";
        break;
      case "missing":
        classes = "missing";
        lengthString = makeLengthString(clue.gridAnswer.replace(/( |-)/g, "a"));
        break;
      default:
    }
    return (
      <li value={clue.n} key={clue.n + clue.direction} className={classes}>
        {clueText} {lengthString}
      </li>
    );
  });
};

const CluesComponent = ({ clues }) => {
  const acrossClues = clues.filter(clue => clue.direction === "across");
  const acrossCluesLis = renderClues(acrossClues);
  const downClues = clues.filter(clue => clue.direction === "down");
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
};

const mapStateToProps = (state, { value, row, col }) => {
  const crossword = currentCrosswordState(state);
  const clues = getPopulatedClues(crossword);
  return {
    clues
  };
};

const Clues = connect(mapStateToProps, {})(CluesComponent);

export default Clues;

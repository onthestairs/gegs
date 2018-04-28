import React from "react";
import { connect } from "react-redux";

import * as gridUtils from "../../grid/grid";
import { insertTextAtCursorClue } from "../../actions";
import { currentCrosswordState } from "../../reducers/utils";
import { wordsThatMatchPattern } from "../../dictionary";

const SuggestionsContainer = ({
  currentAnswer,
  suggestionsWanted,
  suggestions,
  suggestionClick
}) => {
  let content;

  if (!suggestionsWanted) {
    // dont want suggestions for this particular clue
    content = "";
  } else if (suggestionsWanted && suggestions.length === 0) {
    // we did want suggestions but couldn't find any
    content = "No suggestions found in the dictionary";
  } else {
    // we found suggestions
    const lis = suggestions.map(suggestion => (
      <li key={suggestion}>
        <a onClick={e => suggestionClick(suggestion.toLowerCase())}>
          {suggestion}
        </a>
      </li>
    ));
    content = <ul>{lis}</ul>;
  }
  return <div className="suggestions">{content}</div>;
};

const mapStateToProps = state => {
  const { grid, direction, cursor } = currentCrosswordState(state);
  const currentAnswer = gridUtils.positionToAnswer(grid, direction, cursor);
  const currentAnswerPattern = currentAnswer
    .replace(/[^a-zA-Z]/g, "?")
    .toUpperCase();
  let suggestionsWanted = false;
  let suggestions = [];
  if (
    currentAnswerPattern.length > 1 &&
    currentAnswerPattern.indexOf("?") !== -1 &&
    currentAnswerPattern.replace(/[^\?]/, "").length !==
      currentAnswerPattern.length
  ) {
    suggestionsWanted = true;
    suggestions = wordsThatMatchPattern(currentAnswerPattern);
  }
  return {
    currentAnswer,
    suggestionsWanted,
    suggestions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    suggestionClick: text => {
      dispatch(insertTextAtCursorClue(text));
    }
  };
};

const Suggestions = connect(mapStateToProps, mapDispatchToProps)(
  SuggestionsContainer
);

export default Suggestions;

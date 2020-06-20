import React from "react";
import { connect } from "react-redux";

import * as gridUtils from "../../grid/grid";
import {
  insertTextAtCursorClue,
  setShowSuggestsionsStatus
} from "../../actions";
import { currentCrosswordState } from "../../reducers/utils";
import { wordsThatMatchPattern } from "../../dictionary";

const SuggestionsContainer = ({
  showSuggestions,
  currentAnswer,
  suggestionsWanted,
  suggestions,
  suggestionClick,
  onShowSuggestionsChange
}) => {
  let content;

  if (!showSuggestions) {
    content = "";
  } else if (!suggestionsWanted) {
    // dont want suggestions for this particular clue
    content = <div className="suggestionsList">Waiting for clue</div>;
  } else if (suggestionsWanted && suggestions.length === 0) {
    // we did want suggestions but couldn't find any
    content = (
      <div className="suggestionsList">
        No suggestions found in the dictionary
      </div>
    );
  } else {
    // we found suggestions
    const lis = suggestions.map(suggestion => (
      <div key={suggestion} className="suggestion">
        <a onClick={e => suggestionClick(suggestion.toLowerCase())}>
          {suggestion}
        </a>
      </div>
    ));
    content = <div className="suggestionsList">{lis}</div>;
  }

  const controlText = showSuggestions ? "↓" : "↑";

  return (
    <div className="suggestionsBox">
      <div
        className="suggestionsControl"
        onClick={e => onShowSuggestionsChange(!showSuggestions)}
      >
        Suggested words {controlText}
      </div>
      {content}
    </div>
  );
};

const mapStateToProps = state => {
  const { grid, direction, cursor, showSuggestions } = currentCrosswordState(
    state
  );
  const currentAnswer = gridUtils.positionToAnswer(grid, direction, cursor);
  const currentAnswerPattern = currentAnswer
    .replace(/[^a-zA-Z]/g, "?")
    .toUpperCase();
  let suggestionsWanted = false;
  let suggestions = [];
  if (
    currentAnswerPattern.length > 1 &&
    currentAnswerPattern.indexOf("?") !== -1 &&
    currentAnswerPattern.replace(/[^?]/, "").length !==
      currentAnswerPattern.length
  ) {
    suggestionsWanted = true;
    suggestions = wordsThatMatchPattern(currentAnswerPattern);
  }
  return {
    showSuggestions,
    currentAnswer,
    suggestionsWanted,
    suggestions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    suggestionClick: text => {
      dispatch(insertTextAtCursorClue(text));
    },
    onShowSuggestionsChange: showSuggestions => {
      dispatch(setShowSuggestsionsStatus(showSuggestions));
    }
  };
};

const Suggestions = connect(mapStateToProps, mapDispatchToProps)(
  SuggestionsContainer
);

export default Suggestions;

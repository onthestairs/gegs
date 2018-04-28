import React from "react";
import { connect } from "react-redux";
import { setFixGridStatus, setShowSuggestsionsStatus } from "../../actions";
import { currentCrosswordState } from "../../reducers/utils";

const ControlsContainer = ({
  fixGrid,
  onFixGridChange,
  showSuggestions,
  onShowSuggestionsChange
}) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={fixGrid}
          onChange={onFixGridChange}
          value="fixGrid"
        />{" "}
        Fix grid
      </label>
      <label>
        <input
          type="checkbox"
          checked={showSuggestions}
          onChange={onShowSuggestionsChange}
          value="showSuggestions"
        />{" "}
        Show Suggestions
      </label>
    </div>
  );
};

const mapStateToProps = state => {
  const { fixGrid, showSuggestions } = currentCrosswordState(state);
  return {
    fixGrid,
    showSuggestions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFixGridChange: e => {
      dispatch(setFixGridStatus(e.target.checked));
    },
    onShowSuggestionsChange: e => {
      dispatch(setShowSuggestsionsStatus(e.target.checked));
    }
  };
};

const Controls = connect(mapStateToProps, mapDispatchToProps)(
  ControlsContainer
);

export default Controls;

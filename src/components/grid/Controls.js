import React from "react";
import { connect } from "react-redux";
import { setFixGridStatus } from "../../actions";
import { currentCrosswordState } from "../../reducers/utils";

const ControlsContainer = ({ fixGrid, onFixGridChange }) => {
  return (
    <div className="gridControls">
      <label>
        <input
          type="checkbox"
          checked={fixGrid}
          onChange={onFixGridChange}
          value="fixGrid"
        />{" "}
        Fix grid
      </label>
    </div>
  );
};

const mapStateToProps = state => {
  const { fixGrid } = currentCrosswordState(state);
  return {
    fixGrid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFixGridChange: e => {
      dispatch(setFixGridStatus(e.target.checked));
    }
  };
};

const Controls = connect(mapStateToProps, mapDispatchToProps)(
  ControlsContainer
);

export default Controls;

import React from "react";
import { connect } from "react-redux";
import { newCrossword } from "../actions";

const NewCrosswordComponent = ({ dispatch }) => {
  return (
    <button
      type="submit"
      className="selectCrosswordButton"
      onClick={e => {
        e.preventDefault();
        dispatch(newCrossword());
      }}
    >
      New
    </button>
  );
};

const NewCrossword = connect()(NewCrosswordComponent);

export default NewCrossword;

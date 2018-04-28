import React from "react";
import { connect } from "react-redux";
import { selectCrossword, deleteCrossword } from "../actions";

const SelectCrosswordComponent = ({ crosswords, dispatch }) => {
  const crosswordLis = crosswords.map(([id, name]) => {
    return (
      <li key={id} className="navCrossword">
        <span onClick={e => dispatch(selectCrossword(id))}>{name}</span>
        <br />
        <small
          className="deleteCrossword"
          onClick={e => {
            if (window.confirm("Are you sure you want to delete this crossword?")) {
              dispatch(deleteCrossword(id));
            }
          }}
        >
          (Delete)
        </small>
      </li>
    );
  });

  return <ul>{crosswordLis}</ul>;
};

const mapStateToProps = ({ crosswords: { crosswords } }) => {
  let crosswordIdName = [];
  Object.keys(crosswords).forEach(crosswordId => {
    crosswordIdName.push([crosswordId, crosswords[crosswordId].name]);
  });
  return {
    crosswords: crosswordIdName
  };
};

const SelectCrossword = connect(mapStateToProps)(SelectCrosswordComponent);

export default SelectCrossword;

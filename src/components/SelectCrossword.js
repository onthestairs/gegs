import React from "react";
import { connect } from "react-redux";
import { selectCrossword, deleteCrossword } from "../actions";
import { downloadXDString } from "../utils/xd";

const SelectCrosswordComponent = ({ crosswords, dispatch }) => {
  const crosswordLis = crosswords.map(([id, crossword]) => {
    return (
      <li key={id} className="navCrossword">
        <span onClick={(e) => dispatch(selectCrossword(id))}>
          {crossword.name}
        </span>
        <br />
        <small
          className="deleteCrossword"
          onClick={(e) => {
            downloadXDString(crossword);
          }}
        >
          (Download XD)
        </small>

        <small
          className="deleteCrossword"
          onClick={(e) => {
            if (
              window.confirm("Are you sure you want to delete this crossword?")
            ) {
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
  Object.keys(crosswords).forEach((crosswordId) => {
    crosswordIdName.push([crosswordId, crosswords[crosswordId]]);
  });
  return {
    crosswords: crosswordIdName,
  };
};

const SelectCrossword = connect(mapStateToProps)(SelectCrosswordComponent);

export default SelectCrossword;

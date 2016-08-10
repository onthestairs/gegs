import React from 'react'
import { connect } from 'react-redux'
import { selectCrossword } from '../actions'

const SelectCrosswordComponent = ({crosswords, dispatch}) => {

  const options = crosswords.map(([id, name]) => <option key={id} value={id}>{name}</option>);

  let crossowordSelectorId;

  return (
    <form onSubmit={e => {
      e.preventDefault()
      dispatch(selectCrossword(crossowordSelectorId.value));
    }}>
      <select ref={node => {
        crossowordSelectorId = node
      }}>
        {options}
      </select>
      <button type="submit" className="selectCrosswordButton">
        Go
      </button>
    </form>
  )

}

const mapStateToProps = ({crosswords: {crosswords}}) => {
  let crosswordIdName = [];
  Object.keys(crosswords).forEach((crosswordId) => {
    crosswordIdName.push([crosswordId, crosswords[crosswordId].name]);
  });
  return {
    crosswords: crosswordIdName
  }
}

const SelectCrossword = connect(mapStateToProps)(SelectCrosswordComponent);

export default SelectCrossword;

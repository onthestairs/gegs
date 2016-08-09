import React from 'react'
import { connect } from 'react-redux'
import { selectCrossword } from '../actions'

const SelectCrosswordComponent = ({crosswords, dispatch}) => {

  const options = crosswords.map(id => <option key={id}>{id}</option>);

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
  const crosswordIds = Object.keys(crosswords);
  return {
    crosswords: crosswordIds
  }
}

const SelectCrossword = connect(mapStateToProps)(SelectCrosswordComponent);

export default SelectCrossword;

import React from 'react';
import { connect } from 'react-redux';
import {changeCrosswordName} from '../../actions';
import {currentCrosswordState} from '../../reducers/utils';

const NameComponent = ({name, dispatch}) => {

  return (
    <div className="nameGridHolder">
        <input className="nameGrid" value={name} onChange={(e) => {
          dispatch(changeCrosswordName(e.target.value));
        }} />
    </div>
  )
}

const mapStateToProps = (state) => {
  const {name} = currentCrosswordState(state);
  return {
    name
  }
}

const Name = connect(mapStateToProps)(NameComponent)

export default Name

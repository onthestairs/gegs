import React from 'react';
import { connect } from 'react-redux'

const APP_NAME = 'NAME';

const NavigationComponent = () => {
  return (
    <div className="header">
      <div className="logo">
        {APP_NAME}
      </div>
      <div>
        Options
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  
  return {
  }
}


const Navigation = connect(
  mapStateToProps,
  {}
)(NavigationComponent);


export default Navigation;

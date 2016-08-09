import React from 'react';
import { connect } from 'react-redux'
import SelectCrossword from './SelectCrossword';

const APP_NAME = 'NAME';

const NavigationComponent = () => {
  return (
    <div className="header">
      <div className="logo">
        {APP_NAME}
      </div>
      <div>
        <SelectCrossword />
      </div>
    </div>
  )
}

const Navigation = connect()(NavigationComponent);

export default Navigation;

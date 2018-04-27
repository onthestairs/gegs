import React from "react";
import { connect } from "react-redux";
import SelectCrossword from "./SelectCrossword";
import NewCrossword from "./NewCrossword";
import Drawer from "react-motion-drawer";
import { setNavOpen } from "../actions";

const APP_NAME = "NAME";

const NavigationComponent = ({ isNavOpen, dispatch }) => {
  return (
    <div className="header">
      <div className="logo">{APP_NAME}</div>
      <div
        className="drawerButton"
        onClick={e => dispatch(setNavOpen(!isNavOpen))}
      >
        NAVIGATION
      </div>
      <Drawer
        right={true}
        className="navDrawer"
        fadeOut={true}
        handleWidth={0}
        open={isNavOpen}
        onChange={open => dispatch(setNavOpen(open))}
      >
        <h2>Saved Crosswords</h2>
        <SelectCrossword />
        <hr />
        <NewCrossword />
      </Drawer>
    </div>
  );
};

const mapStateToProps = ({ crosswords: { isNavOpen } }) => {
  return {
    isNavOpen
  };
};

const Navigation = connect(mapStateToProps)(NavigationComponent);

export default Navigation;

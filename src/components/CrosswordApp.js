import React from "react";
import Clues from "./Clues";
import Grid from "./Grid";
import ClueBank from "./ClueBank";
import Navigation from "./Navigation";

const CrosswordApp = () => {
  return (
    <div className="appContainer">
      <Navigation />
      <div className="bodyContainer">
        <div className="clueBank">
          <ClueBank />
        </div>
        <Grid />
        <div className="cluesHolder">
          <Clues />
        </div>
      </div>
    </div>
  );
};

export default CrosswordApp;

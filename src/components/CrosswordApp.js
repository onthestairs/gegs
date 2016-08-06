import React from 'react';
import Clues from './Clues';
import Grid from './Grid';

const CrosswordApp = () => {
  return (
    <div className="appContainer">
      <div className="clueBank">
        Clue bank holder
      </div>
      <div className="gridHolder">
        <Grid />
      </div>
      <div className="cluesHolder">
         <Clues />
      </div>
    </div>
  );
}

export default CrosswordApp

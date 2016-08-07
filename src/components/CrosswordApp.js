import React from 'react';
import Clues from './Clues';
import Grid from './Grid';
import ClueBank from './ClueBank';

const CrosswordApp = () => {
  return (
    <div className="appContainer">
      <div className="clueBank">
        <ClueBank />
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

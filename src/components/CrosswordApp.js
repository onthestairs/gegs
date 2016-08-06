import React from 'react';
import Clues from './Clues';
import Grid from './Grid';

const CrosswordApp = () => {
  return (
    <div>
      <div className="gridHolder">
        <Grid />
      </div>
      <div className="clues">
         <Clues />
      </div>
    </div>
  );
}

export default CrosswordApp

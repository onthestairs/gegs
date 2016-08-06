import React, { Component } from 'react';
import Clues from './Clues';
import Grid from './Grid';

import * as gridUtils from '../grid/grid';


class CrosswordApp extends Component {

  constructor(props) {
    super(props);
    const initialGrid = gridUtils.makeGrid(gridUtils.GRID_SIZE);
    this.state = {
      grid: initialGrid,
    };
  }

  setGrid(grid) {
    console.log('setting grid...');
    this.setState({grid: grid});
  }

  render() {
    const {grid} = this.state;
    const clues = gridUtils.gridClueLocations(grid);

    return (
      <div>
        <div className="gridHolder">
          <Grid grid={grid}
                setGrid={(grid) => this.setGrid(grid)}/>
        </div>
        <div className="clues">
          <Clues clues={clues}/>
        </div>
      </div>
    );
  }
}

export default CrosswordApp;

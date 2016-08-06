import React, { Component } from 'react';

const renderClues = (clues) => {
  return clues.map(clue => {
    return <li value={clue.n} key={clue.n + clue.direction}> {clue.clue} ({clue.answer.length})</li>
  });
}

class Clues extends Component {

  render() {
    const {clues} = this.props;
    const acrossClues = clues.filter(clue => clue.direction === 'across');
    const acrossCluesLis = renderClues(acrossClues);
    const downClues = clues.filter(clue => clue.direction === 'down');
    const downCluesLis = renderClues(downClues);
    return (
      <div>
        <h3>Clues</h3>
        <div className="clues">
          <div className="clueList">
            <h3>Across</h3>
            <ol>{acrossCluesLis}</ol>
          </div>
          <div className="clueList">
            <h3>Down</h3>
            <ol>{downCluesLis}</ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Clues;

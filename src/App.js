import React, { Component } from 'react';
import './App.css';
import CrosswordApp from './components/CrosswordApp';

// import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import crosswordApp from './reducers'
import DevTools from './components/DevTools';

import persistState from 'redux-localstorage'


const useDevTools = true;

let enhancer;
if(useDevTools) {
  enhancer = compose(
    DevTools.instrument(),
    persistState(),
  );
} else {
  enhancer = compose(
    persistState(),
  );
}

const store = createStore(crosswordApp, enhancer);

class App extends Component {

  render() {

    let devTools;
    if(useDevTools) {
      devTools = <DevTools />
    } else {
      devTools = null;
    }

    return (
      <Provider store={store}>
        <div className="mainApp">
          <div className="crosswordHolder">
            <CrosswordApp />
          </div>
          {devTools}
        </div>
      </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import CrosswordApp from './components/CrosswordApp';

// import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import crosswordApp from './reducers'
import DevTools from './components/DevTools';


const useDevTools = false;

let store;
if(useDevTools) {

  const enhancer = compose(
    DevTools.instrument()
  );
  store = createStore(crosswordApp, enhancer);

} else {
  store = createStore(crosswordApp);
}

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

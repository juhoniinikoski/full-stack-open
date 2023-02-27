import React from 'react';
import ReactDOM from 'react-dom/client';
import counterReducer from './reducer';

import { createStore } from 'redux';

const store = createStore(counterReducer);

const App = () => {
  const states = store.getState();
  return (
    <div>
      <button onClick={(e) => store.dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={(e) => store.dispatch({ type: 'OK' })}>ok</button>
      <button onClick={(e) => store.dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={(e) => store.dispatch({ type: 'ZERO' })}>
        reset stats
      </button>
      <div>good {states.good}</div>
      <div>ok {states.ok}</div>
      <div>bad {states.bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);

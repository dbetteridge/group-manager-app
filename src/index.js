import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './components/Homepage';
import './css/index.css';
import { Router, Route, browserHistory } from 'react-router';
import configureStore from './configureStore'
import { Provider } from 'react-redux'

let store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} store={store}>
        
        <Route path="/" component={Homepage}/>
        <Route path="/Home" component={Homepage}/>
        
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

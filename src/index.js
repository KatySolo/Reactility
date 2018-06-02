import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app'
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducer';

const middlewere = applyMiddleware(thunk);
const store = createStore(reducer, undefined, middlewere);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
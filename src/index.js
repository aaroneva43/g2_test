import React, { Component, createElement } from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import 'babel-polyfill'

import { Router } from 'react-router-dom';

import reducers from './reducers'

import routes from './routes'


const history = createHistory({ basename: '/' })
const middleware = [routerMiddleware(history)]

// support redux-dev-tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)))

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {routes}
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));

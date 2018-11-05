import { combineReducers } from 'redux'


import { routerReducer } from 'react-router-redux'

import config from './config'

export default combineReducers({
    router: routerReducer,
    config
})

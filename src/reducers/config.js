import {

    SUCCESS, FAILURE, GET_CONFIG

} from '../actions'

import reducerGenerator from './reducerGenerator'
import _ from 'lodash'

const initialState = { entries: [], stack: [] }

const config = reducerGenerator([GET_CONFIG], initialState, {
    [GET_CONFIG]: (state, action) => {
        
        const entry = action.payload.entry;

        return {
            ...state,
            entries: {
                ...state.entries,
                [entry]: _.extend(state.entries[entry], { pending: true })
            }
        }
    }
})

export default config
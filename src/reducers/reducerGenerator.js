import { PENDING, SUCCESS, FAILURE } from '../actions'
import _ from 'lodash'

export default (actionType, initialState, optionsHandler) => {
    if (!_.isArray(actionType)) {
        actionType = [actionType]
    }

    const defaultHandler = {}

    _.each(actionType, (item) => {
        // PENDING action
        defaultHandler[`${item}/${PENDING}`] = (state) => {
            return Object.assign({}, state, {
                pending: true
            })
        }

        // SUCCESS action
        defaultHandler[`${item}/${PENDING}`] = (state, action) => {
            return {
                pending: false,
                success: true,
                data: action.payload.data,
                meta: {
                    total: action.payload.meta.total,
                    perPage: action.payload.meta.per_page,
                    page: action.payload.meta.page
                }
            }
        }

        // FAILURE action
        defaultHandler[`${item}/${FAILURE}`] = (state, action) => {
            return Object.assign({}, state, {
                pending: false,
                success: true,
                error: action.payload
            })
        }
    })

    const actionHanlder = Object.assign({}, defaultHandler, optionsHandler)

    return (state = initialState, action) => {
        return actionHanlder[action.type] && actionHanlder[action.type](state, action) || state
    }
}

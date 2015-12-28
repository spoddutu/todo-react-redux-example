import {combineReducers} from 'redux'
import {ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters} from "../actions/TodoActions.js"

const {SHOW_ALL} = VisibilityFilters

const todos = (state=[], action) => {
	switch(action.type){
		case ADD_TODO:
			return [
				...state,
				{
					id: action.id,
					text: action.text,
					completed: false
				}
			]
		case TOGGLE_TODO:
			return [
				...state.slice(0, action.id),
				Object.assign({}, state[action.id], {completed: !state[action.id].completed}),
				...state.slice(action.id+1)
			]
		default:
			return state
	}
}

const visibilityFilter = (state=SHOW_ALL, action) => {
	switch(action.type){
		case SET_VISIBILITY_FILTER: 
			return action.filter
		default: return state
	}
}

const todoApp = combineReducers({
	todos,
	visibilityFilter
})
export default todoApp
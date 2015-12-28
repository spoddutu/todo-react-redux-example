"use strict"
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import AddTodo from './AddTodo.jsx'
import TodoList from './TodoList.jsx'
import Footer from './Footer.jsx'
import {VisibilityFilters, addTodo, toggleTodo, setVisibilityFilter} from '../actions/TodoActions.js'

class App extends Component{
	render(){
		const {dispatch, filteredTodos, visibilityFilter} = this.props
		return(
			<div className="container">
				<AddTodo addTodo={(text) => dispatch(addTodo(text))} />
				<TodoList todos={filteredTodos}

				toggleTodo={(index) => dispatch(toggleTodo(index))}/>
				<Footer filter={visibilityFilter.SHOW_ALL} filterTodos={(filter) => dispatch(setVisibilityFilter(filter))} />
			</div>
		)
	}
}

App.PropTypes = {
	dispatch: PropTypes.func.isRequired,
	filteredTodos: PropTypes.arrayOf(PropTypes.shape({
	    text: PropTypes.string.isRequired,
	    completed: PropTypes.bool.isRequired
	  }).isRequired).isRequired,
	  visibilityFilter: PropTypes.oneOf([
	    'SHOW_ALL',
	    'SHOW_COMPLETED',
	    'SHOW_ACTIVE'
	  ]).isRequired	
}

const filterTodos = (todos, filter) => {
	switch(filter){
		case VisibilityFilters.SHOW_ALL: 
			return todos
		case VisibilityFilters.SHOW_COMPLETED:
			return todos.filter(todo => todo.completed)
		case VisibilityFilters.SHOW_ACTIVE:
			return todos.filter(todo => !todo.completed)
		default:
			return todos
	}
}

const select = (state) => {
	return {
		filteredTodos: filterTodos(state.todos, state.visibilityFilter),
		visibilityFilter: state.visibilityFilter 
	}
}

export default connect(select)(App)
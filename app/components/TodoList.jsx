"use strict"
import React, {Component, PropTypes} from 'react'
import Todo from './Todo.jsx'

export default class TodoList extends Component{

	render(){
		return(
			<div>
				<ul>
				{this.props.todos.map((todo, index) => 
					<Todo {...todo} 
						key={index}
						toggle={() => this.props.toggleTodo(index)}/>
				)}
				</ul>
			</div>
		)
	}
}

TodoList.PropTypes = {
	todos: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired
	}).isRequired).isRequired  
}
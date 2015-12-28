"use strict"
import React, {Component, PropTypes} from 'react'

export default class AddTodo extends Component{
	render(){
		return(
	  		<form onSubmit={e => this.handleSubmit(e)}>
	  			<div className="input-field">
	  				<input type="text" ref="item" placeholder="Enter todo item"/>
	  			</div>
	  		</form>
		)
	}
	handleSubmit(e){
		e.preventDefault()
		const node = this.refs.item
		this.props.addTodo(node.value.trim())
		node.value = ''
	}
}

AddTodo.PropTypes = {
	addTodo: PropTypes.func.isRequired
}
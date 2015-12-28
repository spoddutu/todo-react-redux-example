"use strict"
import React, {Component, PropTypes} from 'react'

export default class Footer extends Component{
	renderFilter(filter, name){
		if(filter === this.props.filter){
			return name
		}
		return(
			<a href="#" onClick={(e) => {
				e.preventDefault()
				this.props.filterTodos(filter)
			}}>
				{name}
			</a>
		)
	}

	render(){
		return(
			<div>
				show: 
				{' '}
				{this.renderFilter("SHOW_ALL", "All")}
				{', '}
				{this.renderFilter("SHOW_COMPLETED", "Completed")}
				{', '}
				{this.renderFilter("SHOW_ACTIVE", "Active")}
			</div>
		)
	}
}

Footer.PropTypes = {
	filterTodos: PropTypes.func.isRequired,
	filter: PropTypes.oneOf([
		"SHOW_ALL",
		"SHOW_COMPLETED",
		"SHOW_ACTIVE"
	]).isRequired
}
"use strict"
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import App from './components/app.jsx'
import todoApp from './reducers/TodoReducers.js'

let store = createStore(todoApp)

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById("todo-app")
)
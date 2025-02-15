'use strict';

// tag::vars[]
const React = require('react'); // <1>
const ReactDOM = require('react-dom'); // <2>

const App= ()=> {
    return <div>Hello! This is my react App....!!!</div>
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)
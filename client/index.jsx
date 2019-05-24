var React = require('react');
var ReactDom = require('react-dom');
require('./css/index.css');


class App extends React.Component {
    render() {
    	return(
    		<div>
    			Hello World!
    		</div>
    	)
    }
}

ReactDom.render(
	<App />,
	document.getElementById('app')
)

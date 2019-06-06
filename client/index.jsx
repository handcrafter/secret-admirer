var React = require('react');
var ReactDom = require('react-dom');
import Signin from './signin.jsx';
import Signup from './signup.jsx';
require('./css/index.css');

class App extends React.Component {
    render() {
    	return(
    		<div>
				<Signup />
				<Signin />
    		</div>
    	)
    }
}
ReactDom.render(
	<App />,
	document.getElementById('app')
)

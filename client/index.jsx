import ReactDom from 'react-dom';
import React from 'react';
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

import ReactDom from 'react-dom';
import React from 'react';
import Signin from './signin.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

require('./css/index.css');

class App extends React.Component {
    render() {
        return(
                <div className="frontPage">
                    <form>
                        <p className = "titleColour">SECRET ADMIRER</p>
                        <br/>
                        <fieldset>
                            <input type="text" placeholder="Search" className="frontSearch"/>
                        </fieldset>
                    </form>
                </div>
        )
    }
}

ReactDom.render(
    <App />,
    document.getElementById('app')
)

export default App;

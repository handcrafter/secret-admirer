import ReactDOM from 'react-dom';
import React from 'react';
import Signin from './signin.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Next from './components/searchImage.jsx';

require('./css/index.css');

class App extends React.Component {

    handleSignup(event) {
        ReactDOM.render(<Next />, document.getElementById("app"));
        event.preventDefault();
    }

    render() {
        return(
                <div className="frontPage">
                    <form>
                        <p className = "titleColour">SECRET ADMIRER</p>
                        <br/>
                        <fieldset>
                            <input type="text" placeholder="Search" className="frontSearch"/>
                            <button type="button" onClick={this.handleSignup} className="btnSearch">Go</button>
                        </fieldset>
                    </form>
                </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)

export default App;

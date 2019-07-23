import ReactDOM from 'react-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './mainPage.jsx';

require('./css/index.css');

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSearch(event) {
        //Render only if user types something in the input field
        if (this.state.value) {
            var user = this.state.value;
            ReactDOM.render(<MainPage data={user}/>, document.getElementById("app"));
            event.preventDefault();
        }
    }

    handleInputChange = event => {
        this.setState({value: event.target.value });
    };

    render() {
        return(
                <div className="frontPage">
                    <form onSubmit={this.handleSearch}>
                        <p className = "titleColour">SECRET ADMIRER</p>
                        <br/>
                        <fieldset>
                            <input 
                                type="text" 
                                placeholder = "Search"
                                className="frontSearch" 
                                onChange={this.handleInputChange}
                                value={this.state.value}
                                required
                            />
                            <button type="button" className="btnSearch" onClick={this.handleSearch}>Go</button>
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

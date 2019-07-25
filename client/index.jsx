import ReactDOM from 'react-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './nav.jsx';

require('./css/index.css');

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            currentImage: 0
        }
        this.Search = this.Search.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getRandomImageId = this.getRandomImageId.bind(this);
    }

    componentDidMount () {
        setInterval((() => {
            this.setState({
                currentImage: this.getRandomImageId()
            });
        }), 5000)
    }    

    getRandomImageId() {
        const min = 0;
        const max = 3;
        return Math.floor(Math.random() * (max - min)) + min;
    }

    Search(event) {
        //Render only if user types something in the input field
        if (this.state.value) {
            var search = this.state.value;
            ReactDOM.render(<Nav celebrity={search}/>, document.getElementById("app"));
            event.preventDefault();
        }
    }

    handleInputChange = event => {
        this.setState({value: event.target.value });
    };

    render() {
        const images = [
            "/client/src/BTS1.jpg",
            "/client/src/BTS2.jpeg",
            "/client/src/IZ*ONE1.jpg",
            "/client/src/BTS4.jpg",
        ];

        return(
            <div>
                <div className="frontImage">
                    <img src={images[this.state.currentImage]} />
                </div>
                <div className="frontRight">
                    <form onSubmit={this.Search} className="frontPage">
                        <p className = "titleColour">SECRET ADMIRER</p>
                        <br/>
                        <fieldset>
                            <input 
                                type="text" 
                                placeholder = "Search"
                                className="mainSearch" 
                                onChange={this.handleInputChange}                                         
                                value={this.state.value}
                                required
                            />
                            <button className="buttonGo"> Go </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)

export default App;

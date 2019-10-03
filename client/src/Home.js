import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Nav from './component/nav';
import 'bootstrap/dist/css/bootstrap.min.css';

require('./css/index.css');

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchValue: '',
            currentImage: 0,
            width: window.innerWidth
        }
        this.Search = this.Search.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getRandomImageId = this.getRandomImageId.bind(this);
        this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    }

    componentDidMount () {
        window.addEventListener('resize', this.handleWindowSizeChange);
        console.log(this.state.width);
        console.log(process.env.NODE_ENV);
	    setInterval((() => {
            this.setState({
                currentImage: this.getRandomImageId()
            });
        }), 5000)
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };
    
    getRandomImageId() {
        const min = 0;
        const max = 4;
        return Math.floor(Math.random() * (max - min)) + min;
    }

    Search(event) {
        // Render only if user types something in the input field
        if (this.state.searchValue) {
            var search = this.state.searchValue;
            ReactDOM.render(<Nav celebrity={search}/>, document.getElementById("root"));
        }
       event.preventDefault()
    }

    handleInputChange(event) {
        this.setState({searchValue:event.target.value});
        event.preventDefault();
    }

    render() {
        const images = [
            process.env.PUBLIC_URL+"/img/BTS.jpg",
            process.env.PUBLIC_URL+"/img/IZONE.jpg",
            process.env.PUBLIC_URL+"/img/twice.jpg",
            process.env.PUBLIC_URL+"/img/redvelvet1.jpg",
        ];
        const { width } = this.state;
        const isMobile = width <= 500;

        if (isMobile) {
            return(
                <div>
                    <div className="mobileFront">
                        <form onSubmit={this.Search} className="frontPage">
                            <p className = "titleColour">SECRET ADMIRER</p>
                            <br/>
                            <fieldset>
                                <input 
                                    type="text" 
                                    placeholder = "Search"
                                    className="mainSearch" 
                                    onChange={this.handleInputChange}                                         
                                    value={this.state.searchValue}
                                    required
                                />
                                <br/>
                                <button className="buttonGo"> Go </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                    <div className="frontImage">
                        <img src={images[this.state.currentImage]} alt="slide"/>
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
                                    value={this.state.searchValue}
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
}

export default Home;

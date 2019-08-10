import ReactDOM from 'react-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './nav';

require('../css/index.css');

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchValue: '',
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
            "https://upload.wikimedia.org/wikipedia/commons/0/0d/‘LG_Q7_BTS_에디션’_예약_판매_시작_%2842773472410%29_%28cropped%29.jpg",
            "https://i.redd.it/obceohfe3jh21.jpg",
            "http://az879543.vo.msecnd.net/itzy/3.jpg",
            "https://seoulbeats.com/wp-content/uploads/2018/04/20180411_seoulbeats_twice.jpg"
        ];

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

export default Index;
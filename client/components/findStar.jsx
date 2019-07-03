import React, { Component } from 'react';

function postUpdate(url, data) {
    return fetch(url, {
        credentials: 'same-origin',
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
            'Content-Type' : 'application/json',
            'Accept': 'application/json'
        }),
    }).then((result) => {
        if (result.status === 200) {
            console.log("favorite added");
        } else if (result.status === 401) {
            console.log("Unable to save to the favorite list");
        } else {
            console.log("Celebrity is already in favorite list");
        }
    }).catch((error) => {
        console.error(error, 'Cannot fetch the data using post');
    })
}

class FindStar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Celebrity: [],
            click: '',
            isLoaded : false,
            imgPath : '',
            isFavorite: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        fetch('http://localhost:5000/list')
        .then((res) => res.json())
        .then((data) => {
            this.setState({Celebrity:data}, () => console.log(this.state.Celebrity));
        })
    }

    handleClick(event) {
        this.setState({click: event.target.id, isLoaded: true}, () => {
            console.log(this.state.click);

            //Check if selected celebrity is in the favorite list
            var data = {username: 'test1', favorite: this.state.click};
            fetch('http://localhost:5000/isFavorite', {
                credentials: 'same-origin',
                method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
                body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
                headers: new Headers({
                    'Content-Type' : 'application/json',
                    'Accept': 'application/json'
                })
            }).then((result) => {
                if (result.status === 200) {
                    console.log('favorite turn on');
                    this.setState({isFavorite : true});
                } else {
                    console.log('favorite turn off');
                    this.setState({isFavorite : false});
                }
            }).catch((error) => {
                console.log('Fetch call cannot get a response from database', error);
            });
        });

        this.state.Celebrity.map(celeb => {
            if (celeb.name === event.target.id) {
                this.setState({imgPath: celeb.imgPath});
            } 
        })

        event.preventDefault();
    }

    handleSubmit(event) {
        var data = {username: 'test1', favorite: this.state.click};
        if (!this.state.isFavorite) {
            postUpdate('http://localhost:5000/addFavorite', data);
            //change isFavorite state to opposite, in case user clicks favorite button multiple times on one celebrity
            this.setState(prevState => ({
                isFavorite : !prevState.isFavorite
            }))
        } else {
            fetch('http://localhost:5000/removeFavorite', {
                credentials: 'same-origin',
                method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
                body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
                headers: new Headers({
                    'Content-Type' : 'application/json',
                    'Accept': 'application/json'
                })
            }).then((result) => {
                if (result.status === 200) {
                    console.log('removed from the favorite list');
                } else if (result.status === 401) {
                    console.log('Selected celebrity is already removed from the list. please add to the favorite list first');
                } else {
                    console.log('user have not set any favorite yet');
                }
            }).catch((error) => {
                console.log('Fetch call cannot get a response from database', error);
            });

            this.setState(prevState => ({
                isFavorite : !prevState.isFavorite
            }))
        }
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div className = "row">
                    <div className = "column">
                        <ul>
                            {this.state.Celebrity.map(celeb => 
                                <div key = {celeb._id}>
                                    <a href="#" onClick={this.handleClick} id = {celeb.name}>
                                        {celeb.name}
                                    </a>
                                </div>
                            )}
                        </ul>
                    </div>
                    <div className = "column">
                        <div className = "row rowCentered">
                            {this.state.click}
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <button className="btn btnFav" type="submit" value="Favorite">
                                        Favorite
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className = "container">
                            <img 
                                src =  {this.state.imgPath}
                                alt = "main image"
                                width = "100%"
                                height = "100%"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default FindStar;

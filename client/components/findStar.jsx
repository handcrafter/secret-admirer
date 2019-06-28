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
            imgPath : ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
    }
    
    componentDidMount(){
        fetch('http://localhost:5000/list')
        .then((res) => res.json())
        .then((data) => {
            this.setState({Celebrity:data}, () => console.log(this.state.Celebrity));
            console.log(this.props);
        }
    )}

    handleClick(event){
        this.setState({click: event.target.id, isLoaded: true}, () => console.log(this.state.click));
        this.state.Celebrity.map(celeb => {
            if (celeb.name === event.target.id) {
                this.setState({imgPath: celeb.imgPath});
            } 
        })
        event.preventDefault();
    }

    handleFavorite(event){
        postUpdate('http://localhost:5000/addFav', {username: 'test1', favorite: this.state.click});
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
                    <div className = "column" onSubmit={this.handleFavorite}>
                        {this.state.click}
                        <a href="#" onClick={this.handleFavorite}> fav </a>
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

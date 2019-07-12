import React, { Component } from 'react';
import {ListGroup, ListGroupItem, Button, Alert, Card, CardImg, CardBody, CardTitle, Container, Row, Col} from 'reactstrap';

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
            imgPath : 'client/src/InitImg.jpg',
            isFavourite: false
        };
        this.isFavourite = this.isFavourite.bind(this);
        this.handleFavourite = this.handleFavourite.bind(this);
    }
    
    componentDidMount() {
        fetch('http://localhost:5000/list')
        .then((res) => res.json())
        .then((data) => {
            this.setState({Celebrity:data}, () => console.log(this.state.Celebrity));
        })
    }

    isFavourite(event) {
        this.setState({click: event.target.id, isLoaded: true}, () => {
            console.log(this.state.click);

            //Check if selected celebrity is in the favorite list
            var data = {username: 'test1', favourite: this.state.click};
            fetch('http://localhost:5000/isFavourite', {
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
                    this.setState({isFavourite : true});
                } else {
                    console.log('favorite turn off');
                    this.setState({isFavourite : false});
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

    handleFavourite(event) {
        var data = {username: 'test1', favourite: this.state.click};
        if (!this.state.isFavourite) {
            postUpdate('http://localhost:5000/addFavourite', data);
            //change isFavorite state to opposite, in case user clicks favorite button multiple times on one celebrity
            this.setState(prevState => ({
                isFavourite : !prevState.isFavourite
            }))
        } else {
            fetch('http://localhost:5000/removeFavourite', {
                credentials: 'same-origin',
                method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
                body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
                headers: new Headers({
                    'Content-Type' : 'application/json',
                    'Accept': 'application/json'
                })
            }).then((result) => {
                if (result.status === 200) {
                    console.log('removed from the favourite list');
                } else if (result.status === 401) {
                    console.log('Selected celebrity is already removed from the list. please add to the favorite list first');
                } else {
                    console.log('user have not set any favorite yet');
                }
            }).catch((error) => {
                console.log('Fetch call cannot get a response from database', error);
            });

            this.setState(prevState => ({
                isFavourite : !prevState.isFavourite
            }))
        }
        event.preventDefault();
    }

    render() {
        return (
            <Container>
                <Row>
                    <br/>
                </Row>
                <Row>
                    <Col xs="2">
                        <ul className="celebul"> {
                            this.state.Celebrity.map(celeb => 
                                <div key = {celeb._id} className="listItem">
                                    <ListGroup width="100">
                                        <ListGroupItem onClick={this.isFavourite} id = {celeb.name} className =  "listItem">
                                            {celeb.name}
                                        </ListGroupItem>
                                    </ListGroup>
                                </div>)
                        } </ul>
                    </Col>
                    <Col>
                        <div className="container">
                            <Card>
                                <CardImg width="100%" height="50%" src = {this.state.imgPath} alt = "celeb img"/>
                                <CardBody>
                                    <CardTitle className = "listItem">
                                        {this.state.click}
                                    </CardTitle>
                                    <Button className="btn btnFav" type="submit" value="Favorite" onClick={this.handleFavourite}>
                                    Favourite
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
 
export default FindStar;

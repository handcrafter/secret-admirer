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
            imgPath : '',
            isFavorite: false
        };
        this.isFavorite = this.isFavorite.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
    }
    
    componentDidMount() {
        fetch('http://localhost:5000/list')
        .then((res) => res.json())
        .then((data) => {
            this.setState({Celebrity:data}, () => console.log(this.state.Celebrity));
        })
    }

    isFavorite(event) {
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

    handleFavorite(event) {
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
            <Container>
                <Row>
                    <br/>
                </Row>
                <Row>
                    <Col>
                        <Alert color="info">
                                <h3>Choose your Celebrity from the list!</h3>
                        </Alert>
                        <ul>
                            {this.state.Celebrity.map(celeb => 
                                <div key = {celeb._id}>
                                    <ListGroup>
                                        <ListGroupItem onClick={this.isFavorite} id = {celeb.name} className =  "listItem">
                                           {celeb.name}
                                        </ListGroupItem>
                                    </ListGroup>
                                </div>
                            )}
                        </ul>
                    </Col>
                    <Col>
                        <div className="container">
                            <Card>
                                <CardImg width="100%" height="100%" src = {this.state.imgPath} alt = "celeb img"/>
                                <CardBody>
                                    <CardTitle className = "listItem">
                                        {this.state.click}
                                    </CardTitle>
                                    <Button className="btn btnFav" type="submit" value="Favorite" onClick={this.handleFavorite}>
                                    Favorite
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

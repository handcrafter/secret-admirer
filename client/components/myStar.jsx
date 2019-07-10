import React, { Component } from 'react';
import {Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';

class MyStar extends Component {
     constructor(props) {
        super(props);
        this.state = {
            FavouriteList: [],
            ImgPath : 'client/src/InitImg.jpg',
            click : ''
        };
        this.renderImage = this.renderImage.bind();
    }

    componentDidMount() {
        var data = {username : 'test1'};
        fetch('http://localhost:5000/listFavourite', {
            credentials: 'same-origin',
            method: 'POST', 
            body: JSON.stringify(data), 
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            })
        }).then(response => response.json()
        ).then((result) =>  {
                this.setState({FavouriteList:result.favourite}, () => console.log(this.state.FavouriteList));
        }).catch((error) => {
            console.log(error, 'Cannot get favourite list');
        })
    }

    renderImage(event) {
        this.setState({click: event.target.id, isLoaded: true}, () => {
            console.log(this.state.click);
         })
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
                        <ul> {
                            this.state.FavouriteList.map(fav => 
                                <div key = {fav}>
                                    <ListGroup>
                                        <ListGroupItem id={fav} className = "listItem">
                                            {fav}
                                        </ListGroupItem>
                                    </ListGroup>
                                </div>)
                        } </ul>
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Container>
        );
    }
}
 
export default MyStar;



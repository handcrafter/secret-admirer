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
        fetch('http://localhost:5000/favouriteList')
        .then((res) => res.json())
        .then((data) => {
            data.map(fav => {
                if (fav.username === 'test1') {
                    this.setState({FavouriteList:fav.favourite}, () => console.log(this.state.FavouriteList));
                }
            })
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
                                <div>
                                    <ListGroup>
                                        <ListGroupItem id = {fav} className =  "listItem">
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



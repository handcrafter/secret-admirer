import React, { Component } from 'react';
import {Container, Row, Col, ListGroup, ListGroupItem, Card, CardBody, CardTitle, CardImg} from 'reactstrap';

class MyStar extends Component {
     constructor(props) {
        super(props);
        this.state = {
            FavouriteList: [],
            ImgPath : 'client/src/InitImg.jpg',
            click : ''
        };
        this.renderImage = this.renderImage.bind(this);
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
            
            //Get image path of selected celebrity
            var target = {click: this.state.click};
            fetch('http://localhost:5000/getImgPath', {
                credentials : 'same-origin',
                method: 'POST',
                body: JSON.stringify(target),
                headers: new Headers({
                    'Content-Type' : 'application/json',
                    'Accept': 'application/json'
                })
            }).then(response => response.json()
            ).then((path) => {
                this.setState({ImgPath: path.imgPath})
            }).catch((error) => {
                console.log('Cannot get image path of selected celebrity', error)
            })
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
                                        <ListGroupItem id={fav} className = "listItem" onClick={this.renderImage}>
                                            {fav}
                                        </ListGroupItem>
                                    </ListGroup>
                                </div>)
                        } </ul>
                    </Col>
                    <Col>
                        <Card>
                            <CardImg width="100%" height="50%" src = {this.state.ImgPath} alt = "celeb img"/>
                            <CardBody>
                                <CardTitle className = "listItem">
                                    {this.state.click}
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
 
export default MyStar;



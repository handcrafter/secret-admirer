import React, { Component } from 'react';
import {Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from 'react-images';

const images = [
    { src: 'client/src/BTS1.jpg', width: 4, height: 5}, 
    { src: 'client/src/BTS2.jpeg', width: 3, height: 3},
    { src: 'client/src/BTS3.jpg', width: 3, height: 4},
    { src: 'client/src/BTS4.jpg', width: 4, height: 5}];

class MyStar extends Component {
     constructor(props) {
        super(props);
        this.state = {
            FavouriteList: [],
            ImgPath : 'client/src/InitImg.jpg',
            click : '',
            modalIsOpen: false
        };
        this.renderImage = this.renderImage.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal = () => {
        this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
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
        const { modalIsOpen } = this.state;
        return (
            <Container>
                <Row>
                    <br/>
                </Row>   
                <Row>
                    <Col xs="2">
                        <ul className="celebul"> {
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
                        <Gallery photos={images} direction={"column"} onClick={this.toggleModal} />
                        <ModalGateway>
                            {modalIsOpen ? (
                            <Modal onClose={this.toggleModal}>
                                <Carousel views={images} />
                            </Modal>
                            ) : null}
                        </ModalGateway>
                    </Col>
                </Row>
            </Container>
        );
    }
}
 
export default MyStar;



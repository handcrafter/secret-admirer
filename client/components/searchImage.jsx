import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from 'react-images';


class searchImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Initial Image
            images: [
                {src: 'client/src/InitImg.jpg', width: 4, height: 5},
                {src: 'client/src/InitImg.jpg', width: 4, height: 5},
                {src: 'client/src/InitImg.jpg', width: 4, height: 5},
                {src: 'client/src/InitImg.jpg', width: 4, height: 5},
                {src: 'client/src/InitImg.jpg', width: 4, height: 5},
                {src: 'client/src/InitImg.jpg', width: 4, height: 5},
                {src: 'client/src/InitImg.jpg', width: 4, height: 5}],
            modalIsOpen: false,
            selectedIndex: 0
        };
        this.viewSelectedImage = this.viewSelectedImage.bind(this);
        this.closeSelectedImage = this.closeSelectedImage.bind(this);
    }

    viewSelectedImage = (event, image) => {
        this.setState(state => ({ 
            modalIsOpen: !state.modalIsOpen,
            selectedIndex: image.index 
        }));
    }

    closeSelectedImage = () => {
        this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
    }

    render() { 
        const { modalIsOpen } = this.state;
        return (
            <div>
            <Container>
                <Col>
                    <br/>
                    <Gallery photos={this.state.images} direction={"column"} onClick={this.viewSelectedImage} />
                    <ModalGateway>
                        {modalIsOpen ? (
                            <Modal onClose={this.closeSelectedImage}>
                                <Carousel currentIndex={this.state.selectedIndex} views={this.state.images} />
                            </Modal>
                        ) : null}
                    </ModalGateway>
                </Col>
            </Container>
            </div>
        );
    }
}

export default searchImage;
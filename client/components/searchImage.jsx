import React, { Component } from 'react';
import {Container, Row, Col, Spinner} from 'reactstrap';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from 'react-images';

class searchImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [{src: 'client/src/InitImg.jpg', width: 1, height: 1}],
            modalIsOpen: false,
            selectedIndex: 0,
            urls: [],
            isLoaded: false,
            isFavImage: false
        };
        this.viewSelectedImage = this.viewSelectedImage.bind(this);
        this.closeSelectedImage = this.closeSelectedImage.bind(this);
        this.modalFavourite = this.modalFavourite.bind(this);
    }

    componentDidMount() {
        //Set celebrity as what user searched and get image urls
        var celebrity = {target: this.props.celebrity};

        fetch('http://localhost:5000/getImageUrl', {
            credentials: 'same-origin',
            method: 'POST', 
            body: JSON.stringify(celebrity), 
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            })
        }).then(response => response.json()
        ).then((result) => {
            console.log(result);
            var tmp = [];
            this.setState(
                {urls: result}, () => {
                    this.state.urls.map(path => {
                        var format = {src: `${path}`, width: 1, height: 1};
                        var newImgFormat = tmp.concat(format);
                        tmp = newImgFormat;
                    });
                });
            this.setState({images: tmp, isLoaded: true});
        }).catch((error) => {
            console.log(error, 'Cannot get searched image urls');
        })
    }

    modalFavourite = () => {
        this.setState(state => ({ isFavImage: !state.isFavImage }));
    }
    
    viewSelectedImage = (event, image) => {
        this.setState(state => ({ 
            modalIsOpen: !state.modalIsOpen,
            selectedIndex: image.index
        }));
    }

    closeSelectedImage = () => {
        this.setState(state => ({ modalIsOpen: !state.modalIsOpen}));
    }

    render() { 
        const { modalIsOpen, isLoaded, isFavImage } = this.state;
        
        const ModalHeader = ({ innerProps, isModal}) => isModal ? (
            <div {...innerProps}>
                {isFavImage ? 
                    <p onClick={this.modalFavourite}  className="modalFav" >♡</p> :
                    <p onClick={this.modalFavourite}  className="modalFavClick" >♥</p>
                }
            </div>
        ) : null;

        return (
            <div>
            <Container>
                <Col>
                    <br/>
                    {isLoaded ? 
                        <Gallery photos={this.state.images} direction={"column"} onClick={this.viewSelectedImage} /> :
                        <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} type="grow" /> 
                    }
                    <ModalGateway>
                        {modalIsOpen ? (
                            <Modal onClose={this.closeSelectedImage}>
                                <Carousel currentIndex={this.state.selectedIndex} views={this.state.images} components={{ Header: ModalHeader }}/>
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
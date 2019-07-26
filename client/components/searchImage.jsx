import React, { Component } from 'react';
import {Container, Col, Spinner} from 'reactstrap';
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
            isFavImage: false,
            favImgUrl: ''
        };
        this.viewSelectedImage = this.viewSelectedImage.bind(this);
        this.closeSelectedImage = this.closeSelectedImage.bind(this);
        this.setImgAsFavourite = this.setImgAsFavourite.bind(this);
        this.isFavourite = this.isFavourite.bind(this);
        this.addToFavList = this.addToFavList.bind(this);
        this.removeFromFavList = this.removeFromFavList.bind(this);
    }

    componentDidMount() {
        // Set celebrity as what user searched and get image urls
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
            console.err(error, 'Cannot get searched image urls');
        })
    }

    setImgAsFavourite = () => {
        // data to be saved in the favourite list
        var favImg = {username: 'test', favourite: this.state.favImgUrl};

        // remove from the list if selected image is already in the list, and vice versa
        if (this.state.isFavImage) {
            this.removeFromFavList(favImg);
        } else {
            this.addToFavList(favImg);
        }
    }

    addToFavList(data) {
        return fetch('http://localhost:5000/addFavourite', {
            credentials: 'same-origin',
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            }),
        }).then((result) => {
            if (result.status === 200) {
                // if successfully saved, set isFavourite to true 
                console.log("Favorite added");
                this.setState({isFavImage: true});
            } else if (result.status === 401) {
                console.err("Unable to save to the favorite list");
            } else {
                console.err("Image url is already in favorite list");
            }
        }).catch((error) => {
            console.err(error, 'Cannot fetch the data using post');
        })
    }
    
    removeFromFavList(data) {
        fetch('http://localhost:5000/removeFavourite', {
            credentials: 'same-origin',
            method: 'POST', 
            body: JSON.stringify(data), 
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            })
        }).then((result) => {
            if (result.status === 200) {
                // if sucessfully removed, set isFavourite to false
                console.log('Removed from the favourite list');
                this.setState({isFavImage: false});
            } else if (result.status === 401) {
                console.err('Selected img url is already removed from the list. please add to the favorite list first');
            } else {
                console.err('User have not set any favorite yet');
            }
        }).catch((error) => {
            console.err('Fetch call cannot get a response from database', error);
        });
    }

    viewSelectedImage = (event, image) => {
        this.setState({ 
            selectedIndex: image.index
        }, 
            this.isFavourite(image.index)
        );
    }

    isFavourite(index) {
        // check if image is already in the list
        var imgUrl = this.state.images[index].src;
        var data = {username: "test", url: imgUrl};
        fetch('http://localhost:5000/isFavourite', {
            credentials: 'same-origin',
            method: 'POST', 
            body: JSON.stringify(data), 
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            })
        }).then((result) => {
            if (result.status === 200) {
                // if image is found in database, set isFav as true
                this.setState({isFavImage : true, modalIsOpen: true, favImgUrl: imgUrl});
            } else {
                // if image is not found, set isFav as false
                this.setState({isFavImage : false, modalIsOpen: true, favImgUrl: imgUrl});
            }
        }).catch((error) => {
            console.err('Fetch call cannot get a response from database', error);
        });
    }

    closeSelectedImage = () => {
        this.setState(state => ({ modalIsOpen: false}));
    }

    render() { 
        const { modalIsOpen, isLoaded, isFavImage } = this.state;
        
        const ModalHeader = ({ innerProps, isModal}) => isModal ? (
            <div {...innerProps}>
                {isFavImage ? 
                    <p onClick={this.setImgAsFavourite}  className="modalFavClick">♥</p> :
                    <p onClick={this.setImgAsFavourite}  className="modalFav">♡</p>
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
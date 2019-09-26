import React, { Component } from 'react';
import { Container, Col, Spinner } from 'reactstrap';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Gallery from "react-photo-gallery";
import config from '../config';

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
            favImgUrl: '',
            username: "",
            scrollPosition: 0,
            LoadMoreImg: false
        };
        this.viewSelectedImage = this.viewSelectedImage.bind(this);
        this.closeSelectedImage = this.closeSelectedImage.bind(this);
        this.setImgAsFavourite = this.setImgAsFavourite.bind(this);
        this.isFavourite = this.isFavourite.bind(this);
        this.addToFavList = this.addToFavList.bind(this);
        this.removeFromFavList = this.removeFromFavList.bind(this);
        this.moreImage = this.moreImage.bind(this);
        this.isDuplicateImage = this.isDuplicateImage.bind(this);
        this.listenToScroll = this.listenToScroll.bind(this);
    }

    //get updated username when user sign in
    static getDerivedStateFromProps = (props, state) => {
        if (props.username !== state.username) {
            return {
                username: props.username
            };
        }
        return null;
    }

    componentDidMount = () => {
        // Scroll change event Listener
        window.addEventListener('scroll', this.listenToScroll);

        // Set celebrity as what user searched and get image urls
        var celebrity = {target: this.props.celebrity};
       
        fetch(config.URL+'/getImageUrl', {
            credentials: 'same-origin',
            method: 'POST', 
            body: JSON.stringify(celebrity), 
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            })
        }).then(response => response.json()
        ).then((result) => {
            var tmpImages = [];
            var img = new Image();
            
            this.setState(
                {urls: result}, () => {
                    this.state.urls.forEach(path => {
                        // set image format as the same ratio with the original image dimention
                        img.src = path;

                        var widthRatio = parseInt(img.width/100);
                        var heightRatio  = parseInt(img.height/100);

                        if (widthRatio === 0 && heightRatio === 0) {
                            widthRatio = 1;
                            heightRatio = 1;
                        } else if(widthRatio === 0) {
                            widthRatio = 1;
                        } else if (heightRatio === 0) {
                            heightRatio = 1;
                        }

                        var format = {src: `${path}`, width: widthRatio, height: heightRatio};
                        var newImgFormat = tmpImages.concat(format);
                        tmpImages = newImgFormat;
                    });
                });
            this.setState({images: tmpImages, isLoaded: true});
        }).catch((error) => {
            console.error(error, 'Cannot get searched image urls');
        })
    }
    
    moreImage = () => {
        this.setState({LoadMoreImg: true});
        // Set celebrity as what user searched and get more image urls
        var celebrity = {target: this.props.celebrity};
       
        fetch(config.URL+'/getMoreImageUrl', {
            credentials: 'same-origin',
            method: 'POST', 
            body: JSON.stringify(celebrity), 
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            })
        }).then(response => response.json()
        ).then((result) => {
            var tmpImages = this.state.images;
            this.setState (
                {urls: result}, () => {
                    this.state.urls.forEach(path => {
                        if (!this.isDuplicateImage(path)) {
                            var format = {src: `${path}`, width: 1, height: 1};
                            var newImgFormat = tmpImages.concat(format);
                            tmpImages = newImgFormat; 
                        }
                    });
                });
            this.setState({images: tmpImages, isLoaded: true, LoadMoreImg: false});
        }).catch((error) => {
            console.error(error, 'Cannot get searched image urls');
        })
    }

    isDuplicateImage(path) {
        var result = this.state.images.some(function(image) {
            return image.src === path;
        })
        return result;
    }
    

    setImgAsFavourite = () => {
        // data to be saved in the favourite list
        var favImg = {username: this.state.username, favourite: this.state.favImgUrl};

        // remove from the list if selected image is already in the list, and vice versa
        if (this.state.isFavImage) {
            this.removeFromFavList(favImg);
        } else {
            if (!this.state.username) {
                alert("Please sign in before saving image");
            } else {
                this.addToFavList(favImg);
            }
        }
    }

    addToFavList(data) {
        return fetch(config.URL+'/addFavourite', {
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
                console.error("Unable to save to the favorite list");
            } else {
                console.error("Image url is already in favorite list");
            }
        }).catch((error) => {
            console.error(error, 'Cannot fetch the data using post');
        })
    }
    
    removeFromFavList(data) {
        fetch(config.URL+'/removeFavourite', {
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
                console.error('Selected img url is already removed from the list. please add to the favorite list first');
            } else {
                console.error('User have not set any favorite yet');
            }
        }).catch((error) => {
            console.error('Fetch call cannot get a response from database', error);
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
        var data = {username: this.state.username, url: imgUrl};
        fetch(config.URL+'/isFavourite', {
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
            console.error('Fetch call cannot get a response from database', error);
        });
    }

    closeSelectedImage = () => {
        this.setState(state => ({ modalIsOpen: false}));
    }

    listenToScroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = winScroll / height;
        this.setState({scrollPosition: scrolled})
       
        // Start loading more images if scroll is down more than 50% and images are not already loading
        if (this.state.scrollPosition > 0.5 && this.state.LoadMoreImg === false) {
            this.moreImage();
        }
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
                        <div>
                            <Gallery photos={this.state.images} direction={"column"} onClick={this.viewSelectedImage} className="gallery"/>
                            <p onClick={this.moreImage} className="listItem"> Load more </p>
                        </div>
                        :
                        <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} type="grow" /> 
                    }
                    <ModalGateway>
                        {modalIsOpen ? (
                            <Modal onClose={this.closeSelectedImage}>
                                <Carousel className="gallery" currentIndex={this.state.selectedIndex} views={this.state.images} components={{ Header: ModalHeader }}/>
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

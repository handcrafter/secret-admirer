import React, { Component } from 'react';
import { Container, Col} from 'reactstrap';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Gallery from "react-photo-gallery";

class SavedImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [{src: 'client/src/InitImg.jpg', width: 1, height: 1}],
            tmpImg: [],
            FavouriteList: [],
            selectedIndex: 0,
            modalIsOpen: false,
            currentImgUrl: '',
            username: ""
        };
        this.viewSelectedImage = this.viewSelectedImage.bind(this);
        this.closeSelectedImage = this.closeSelectedImage.bind(this);
        this.removeFromFavList = this.removeFromFavList.bind(this);
        this.updateImages = this.updateImages.bind(this);
    }

    componentDidMount() {
        if (this.props.location.username === "") {
            console.log(this.props.location.state.username);
            // Empty username indicates signed out state. Default images will be used for gallery display
            this.setState({images: [{src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg/1920px-An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg', width: 1, height: 1}]});
        } else {
            var data = {username : this.props.location.state.username};
            fetch('http://localhost:5000/listFavourite', {
                credentials: 'same-origin',
                method: 'POST', 
                body: JSON.stringify(data), 
                headers: new Headers({
                    'Content-Type' : 'application/json',
                    'Accept': 'application/json'
                })
            }).then(response => response.json()
            ).then((result) => {
                var imgFormat = [];
                this.setState({FavouriteList:result.favourite}, () => {
                    // eslint-disable-next-line
                    this.state.FavouriteList.map(list => {
                        var format = {src: `${list}`, width: 1, height: 1};
                        var newImgFormat = imgFormat.concat(format);
                        imgFormat = newImgFormat;
                    })
                });
                this.setState({images: imgFormat}, () => {console.log(this.state.images)});
            }).catch((error) => {
                console.error(error, 'Cannot get favourite list');
            })
        }
    }

    viewSelectedImage = (event, image) => {
        var imgUrl = this.state.images[image.index].src
        this.setState({ 
            selectedIndex: image.index,
            modalIsOpen: true,
            currentImgUrl: imgUrl,
        });
    }

    closeSelectedImage() {
        this.setState({modalIsOpen: false});
    }

    removeFromFavList() {
        var data = {username: this.state.username, favourite: this.state.currentImgUrl};
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
                // if sucessfully removed, close modal and update gallery display
                console.log('Removed from the favourite list');
                this.updateImages();
                this.setState({
                    modalIsOpen: false,
                });
            } else if (result.status === 401) {
                console.error('Selected img url is already removed from the list. please add to the favorite list first');
            } else {
                console.error('User have not set any favorite yet');
            }
        }).catch((error) => {
            console.error('Fetch call cannot get a response from database', error);
        });
    }

    updateImages() {
        var array = [...this.state.images]; 
        var index = this.state.selectedIndex;
        array.splice(index, 1);
        this.setState({images: array});
    }

    render() { 
        const { modalIsOpen} = this.state;
        
        const ModalHeader = ({ innerprops, isModal} = this.props) => isModal ? (
            <div {...innerprops}>
                <span className="modalRemove" onClick={this.removeFromFavList}>🗑</span>
            </div>
        ) : null;
        
        const ModalFooter = ({ innerProps, isModal }) => isModal ? (
            <div {...innerProps}>
              <span>
                  <p className="modalFooter">{this.state.selectedIndex} of {this.state.images.length}</p>
              </span>
            </div>
          ) : null;

        return (
            <div>
                <Container>
                    <Col>
                        <Gallery photos={this.state.images} direction={"column"} onClick={this.viewSelectedImage} />
                        <ModalGateway>
                            {modalIsOpen ? (
                                <Modal onClose={this.closeSelectedImage}>
                                    <Carousel currentIndex={this.state.selectedIndex} views={this.state.images} components={{ Header: ModalHeader , Footer: ModalFooter}}/>
                                </Modal>
                            ) : null}
                        </ModalGateway>
                    </Col>
                </Container>
            </div> 
        );
    }
}
 
export default SavedImage;
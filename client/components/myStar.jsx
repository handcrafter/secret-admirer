import React, { Component } from 'react';
import {Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from 'react-images';

class MyStar extends Component {
     constructor(props) {
        super(props);
        this.state = {
            FavouriteList: [],
            ImgPath : [],
            imgFormat: [{src: 'client/src/InitImg.jpg', width:4, height:5}],
            click : '',
            modalIsOpen: false,
            selectedIndex: 0
        };
        this.renderImage = this.renderImage.bind(this);
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
        this.setState({click: event.target.id}, () => {
            console.log(this.state.click);

            //To avoid infinte concatenation on imgFormat and for the inital image
            this.setState({imgFormat: [{src: 'client/src/InitImg.jpg', width:4, height:5}]});
            
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
                this.setState({ImgPath: path.imgPath});
                
                // Change array of img paths into the format that Gallery can interprete
                this.state.ImgPath.map(path => {
                    var format = {src: `${path}`, width: 4, height: 5};
                    var joined = this.state.imgFormat.concat(format);
                    this.setState({imgFormat: joined});
                })
        
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
                        <Gallery photos={this.state.imgFormat} direction={"column"} onClick={this.viewSelectedImage} />)}
                        <ModalGateway>
                            {modalIsOpen ? (
                                <Modal onClose={this.closeSelectedImage}>
                                    <Carousel currentIndex={this.state.selectedIndex} views={this.state.imgFormat} />
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



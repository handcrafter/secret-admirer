import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          id: "",
          password: "",
          login: false,
          modalState: 'Sign In',
          username: ""
        };
        this.openModal = this.openModal.bind(this);
        this.signin = this.signin.bind(this);
        this.signup = this.signup.bind(this);
    }
    
    openModal() {
        this.setState(prevState => ({
          modal: !prevState.modal,
          modalState: 'Sign In'
        }));
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    signin(event) {
        if (this.state.modalState === 'Sign Up') {
            this.setState({modalState: 'Sign In'});
        } else {
            var userInfo = {id: this.state.id, password: this.state.password};
            return fetch("http://localhost:5000/signin", {
                credentials: "same-origin",
                method: "POST",
                body: JSON.stringify(userInfo),
                headers: new Headers({
                    "Content-Type": "application/json",
                    Accept: "application/json"
                })
            })
            .then(result => {
                if (result.status === 200) {
                    console.log("sign in successful");
                    this.setState(prevState => ({
                        modal: !prevState.modal,
                        login: true,
                        username: this.state.id
                      }));
                } else if (result.status === 400) {
                    alert("Wrong Password!")
                } else {
                    alert("Username doesn't exist, Please Sign up!")
                }
            })
            .catch(error => {
                console.error(error, "PostRequest error");
            });
        }
        event.preventDefault();
    }

    signup() {
        if (this.state.modalState === 'Sign In') {
            this.setState({modalState: 'Sign Up'});
        } else {
            var userInfo = {id: this.state.id, password: this.state.password};
            return fetch('http://localhost:5000/signup', {
                credentials: 'same-origin',
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
            }).then((result) => {
                if (result.status === 200) {
                    alert("Signup successful!");
                    this.setState({modalState: 'Sign In'});
                }
                else {
                    alert("Existing username please try other ID");
                }
            }).catch((error) => {
                console.error(error, "PostRequest error");
            })
        }
    }

    render() { 
        return ( 
            <nav className="navbar">
                <Link to="/">
                    <h3 className="logo">Secret Admirer</h3>
                </Link>
                <ul className = "nav-links">
                    <li><NavLink to="/saved" className="navHeadings" activeClassName="current">Saved</NavLink></li>
                    {(this.state.username === "") ? 
                        <li onClick={this.openModal} className="navHeadings">Log In to Account</li>
                    :
                        <li className="navHeadings">Welcome {" " + this.state.username + "!"} </li>
                    }
                </ul>

                <Modal isOpen={this.state.modal} openModal={this.openModal} className={this.props.className}>
                    <ModalHeader openModal={this.openModal}>{this.state.modalState}</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <p>
                                Username : 
                                <input
                                    type="text"
                                    value={this.state.id}
                                    onChange={this.handleInputChange}
                                    name="id"
                                    placeholder="Enter your ID..."
                                    required
                                />
                            </p>
                        </div>
                        <div className="form-group">
                            <p>
                            Password : 
                                <input
                                    type="text"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                />
                            </p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {(this.state.modalState === "Sign In") ? 
                            <div>
                                <Button color="primary" onClick={this.signin}>Sign In</Button>
                                <Button color="secondary" onClick={this.signup}>Sign Up</Button>
                            </div>
                        : 
                            <div>
                                <Button color="primary" onClick={this.signup}>Sign Up</Button>
                                <Button color="secondary" onClick={this.openModal}>Cancel</Button>
                            </div>        
                        }
                    </ModalFooter>
                </Modal>
            </nav>
        );
    }
}
  
export default Nav;
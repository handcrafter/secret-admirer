import React, { Component } from 'react';
import { Button, ButtonDropdown, Col, DropdownToggle, DropdownItem, DropdownMenu, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, ModalFooter, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import config from '../config';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            id: "",
            password: "",
            login: false,
            modalState: 'Sign In',
            username: "",
            dropdownOpen: false,
            celebrity: "",
            celebList: [],
            isSearching: false,
            searchDrop: [],
            isSearchDrop: false,
            width: window.innerWidth,
            mobSearchBar: true,
            keyIndex : -1
        };
        this.logInDropDown = this.logInDropDown.bind(this);
        this.logout = this.logout.bind(this);
        this.openModal = this.openModal.bind(this);
        this.navSearch = this.navSearch.bind(this);
        this.searchInputChange = this.searchInputChange.bind(this);
        this.signin = this.signin.bind(this);
        this.signup = this.signup.bind(this);
        this.dropDownSelect = this.dropDownSelect.bind(this);
        this.showSaved = this.showSaved.bind(this);
        this.redirectHome = this.redirectHome.bind(this);
        this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
        this.mobileSearch = this.mobileSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);

        fetch(config.URL+'/list')
        .then((res) => res.json())
        .then((data) => {
            var celebNames = [];
            data.forEach(name => {
                return celebNames.push(name.name);
            })
            // Initialize celebity list
            this.setState({
                searchDrop: celebNames,
                celebList: celebNames,
                celebrity: this.props.celebrity
            });
        })
    }

    openModal() {
        this.setState(prevState => ({
            modal: !prevState.modal,
            modalState: 'Sign In'
        }));
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };
    
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    signin(event) {
        if (this.state.modalState === 'Sign Up') {
            this.setState({modalState: 'Sign In'});
        } else {
            var userInfo = {id: this.state.id, password: this.state.password};
            return fetch(config.URL+"/signin", {
                credentials: "same-origin",
                method: "PUT",
                body: JSON.stringify(userInfo),
                headers: new Headers({
                    "Content-Type": "application/json",
                    Accept: "application/json"
                })
            })
            .then(result => {
                if (result.status === 200) {
                    console.log("Sign in successful");
                    this.setState(prevState => ({
                        modal: !prevState.modal,
                        login: true,
                        username: this.state.id
                    }));
                    // send username to parent when sign in is successful
                    var data = {username: this.state.username, saved: false};
                    this.props.parentCallback(data);
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
            return fetch(config.URL+'/signup', {
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

    logout = () => {
        this.setState({
            username: "",
            id: ""
        }, () => {
            var data = {username: this.state.username, saved: false, celebrity: this.state.celebrity};
            this.props.parentCallback(data);
        });
    }

    logInDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    navSearch(event) {
        console.log(this.state.celebrity);
        this.setState({isSearchDrop: false});
        // Send user searched celebrity value if such value is not empty
        if (this.state.celebrity) {
            var data = {username: this.state.username, celebrity: this.state.celebrity};
            this.props.parentCallback(data);
        }
        event.preventDefault();
    }

    searchInputChange = (event) => {
        if (!event.target.value) {
            this.setState({
                isSearchDrop: false,
                keyIndex: -1,
                celebrity: event.target.value
            })
        } else {
            var updatedList = this.state.celebList;
            updatedList = updatedList.filter(function(item) {
                return (item.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
            })
            this.setState({
                isSearchDrop: true,
                celebrity: event.target.value,
                keyIndex: -1,
                searchDrop : updatedList
            });
        }
    }
    
    // Search celebrity selected from drop down list
    dropDownSelect = (event) => {
        this.setState({
            celebrity: event.target.id,
            isSearchDrop: false
        }, () => {
            this.navSearch(event);
        });
    }

    showSaved(event) {
        if (!this.state.username) {
            alert("Please sign in to access saved images")
            this.setState(prevState => ({
                modal: !prevState.modal,
                modalState: 'Sign In'
            }));
        } else {
            var data = {saved: true}
            this.props.parentCallback(data);
            event.preventDefault();
        }
    }
    
    redirectHome(event) {
        var data = {username: this.state.username, celebrity: this.state.celebrity, saved: false}
        this.props.parentCallback(data);
        event.preventDefault();
    }

    // Toggle searchbar on mobile version
    mobileSearch() {
        this.setState(prevState => ({mobSearchBar: !prevState.mobSearchBar}));
    }

    handleKeyPress = (event) => {
        // press down
        var index = this.state.keyIndex;
        var length = this.state.searchDrop.length-1;
        if (event.key === 'ArrowDown' && this.state.isSearchDrop) {
            if (index >= length) {
                this.setState({keyIndex: length});
            } else {
                index++;
                this.setState({keyIndex: index});
            }
        } 
        // press up
        else if (event.key === 'ArrowUp' && this.state.isSearchDrop) {
            if (this.state.keyIndex === -1 || this.state.keyIndex === 0) {
                this.setState({keyIndex: 0});
            } else {
                index--;
                this.setState({keyIndex: index});
            }
        }
        //press Enter
        else if (event.key === 'Enter' && this.state.isSearchDrop && this.state.keyIndex > -1) {
            this.setState({celebrity: this.state.searchDrop[this.state.keyIndex]});
        }
    }

    render() {
        const { width } = this.state;
        const isMobile = width <= 500;

        if (isMobile) {
            return (
                <nav className="navbar-mobile">
                    <ul className = "nav-mobile">
                        <Link to="/">
                            <h3 className="logo-mobile" onClick={this.redirectHome}>SA</h3>
                        </Link>
                        <li onClick={this.mobileSearch} className="nav-headings-mobile" activeClassName="current"> Search </li>
                        <li onClick={this.showSaved} className="nav-headings-mobile" activeClassName="current"> Saved </li>
                        {(this.state.username === "") ? 
                            <li onClick={this.openModal} className="nav-headings-mobile">Log In</li> :
                            <div>
                                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.logInDropDown} className="loginMargin">
                                    <DropdownToggle caret className="login-drop">
                                        {this.state.username}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={this.logout} >Log out</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </div>
                        }
                    </ul>

                   {(this.state.mobSearchBar) &&  
                        <form onSubmit={this.navSearch}>
                            <input 
                                type="text" 
                                placeholder = "Search"
                                className="nav-search-mobile" 
                                onChange={this.searchInputChange}                                         
                                value={this.state.celebrity}
                                required
                            />
                        </form>
                    }

                    <Modal isOpen={this.state.modal} toggle={this.openModal} className={this.props.className}>
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
                                        type="password"
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
        } else {
            return ( 
                <nav className="navbar">
                    <div className="logo-div">
                        <Row>
                            <Col xs="auto">
                                <Link to="/">
                                    <h3 className="logo" onClick={this.redirectHome}>Secret Admirer</h3>
                                </Link>
                            </Col>
                            <Col xs="6" sm="4" className="search-column">
                                <form onSubmit={this.navSearch} onKeyDown={this.handleKeyPress}>
                                    <input 
                                        type="text" 
                                        placeholder = "Search"
                                        className="nav-search" 
                                        onChange={this.searchInputChange}                                         
                                        value={this.state.celebrity}
                                        required
                                    />
                                </form>
                                {this.state.isSearchDrop ? 
                                    <div className="search-drop-down" >
                                        <ul className="celeb-ul"> {
                                            this.state.searchDrop.map((searched, index) => 
                                                <ListGroup width="100" >
                                                    {this.state.keyIndex === index ?
                                                        <ListGroupItem onClick={this.dropDownSelect} className="list-item-focus" key={index} id={searched}>
                                                            {searched}
                                                        </ListGroupItem>:
                                                        <ListGroupItem onClick={this.dropDownSelect} className="list-item" key={index} id={searched}>
                                                            {searched}
                                                        </ListGroupItem>
                                                    }
                                                </ListGroup>
                                            )
                                        } </ul>
                                    </div>
                                : null
                                }
                            </Col>
                        </Row>
                    </div>
                  
                    <ul className = "nav-links">
                        <li onClick={this.showSaved} className="nav-headings" activeClassName="current"> Saved </li>
                        {(this.state.username === "") ? 
                            <li onClick={this.openModal} className="nav-headings">Log In</li>
                        :
                            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.logInDropDown}>
                                <DropdownToggle caret className="logOut">
                                    {this.state.username}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={this.logout}>Log out</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        }
                    </ul>
    
                    <Modal isOpen={this.state.modal} toggle={this.openModal} className={this.props.className}>
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
                                        type="password"
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
                                </div> : 
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
}
  
export default Nav;

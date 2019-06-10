import React, { Component } from "react";
import Main from "./mainPage.jsx";
import ReactDOM from "react-dom";
import Signup from './signup.jsx';

function postSend(url, data) {
    return fetch(url, {
        credentials: "same-origin",
        method: "POST", // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json"
        })
    })
    .then(result => {
        ReactDOM.render(<Main />, document.getElementById("app"));
    })
    .catch(error => {
        console.error(error, "postRequest error");
    });
}

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = { id: "", password: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {}

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit(event) {
        postSend("http://localhost:5000/signin", this.state);
        event.preventDefault();
    }

    handleSignup(event) {
        ReactDOM.render(<Signup />, document.getElementById("app"));
        event.preventDefault();
    }

    render() {
    return (
        <div>
            <h1>Welcome to Secret Admirer</h1>
            <form onSubmit={this.handleSubmit}>
            <hr />
            <label>Enter Your Credentials to sign In</label>
            <div className="form-group">
                <p>
                    user id:
                    <input
                        type="text"
                        value={this.state.id}
                        onChange={this.handleChange}
                        name="id"
                        placeholder="Enter your ID..."
                        required
                    />
                </p>
                <br />
            </div>
            <div className="form-group">
                <p>
                Password:
                    <input
                        type="text"
                        value={this.state.password}
                        onChange={this.handleChange}
                        name="password"
                        placeholder="Enter your password"
                        required
                    />
                </p>
                <br />
            </div>
            <button className="btn btn-success" type="submit" value="Sign In">
                Sign In
            </button>
            </form>
            <form onSubmit={this.handleSignup}> 
                <button className="btn btn-success" type="submit" value="Sign Up"> Sign Up </button> 
            </form>
        </div>
        );
    }
}

export default Signin;

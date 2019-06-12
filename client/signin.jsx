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
        console.log(result.status);
        if(result.status === 200){
            ReactDOM.render(<Main />, document.getElementById("app"));}
        else if(result.status === 400){
            alert("Wrong Password!")}
        else{
            alert("Username doesn't exist, Please Sign up!")}
        
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
        <div className= "signup">
            <h1 className = "txtClr">Join Secret Admirer today!</h1>
            <form onSubmit={this.handleSubmit}>
            <hr />
            <div className="form-group">
                <p>
                    Username : 
                    <input
                        type="text"
                        value={this.state.id}
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
                        name="password"
                        placeholder="Enter your password"
                        required
                    />
                </p>
            </div>
            <button className="btn btn-success btnLogin" type="submit" value="Sign In" color="White">
                Log In
            </button>
            <button className= "btn btn-success btnSignup" type="button" onClick={this.handleSignup}>Sign Up</button>
            </form>
        </div>
        );
    }
}

export default Signin;

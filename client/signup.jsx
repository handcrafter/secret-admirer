import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Index  from './index.jsx';

function postSend(url, data) {
    return fetch(url, {
        credentials: 'same-origin',
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }),
    }).then((result) => {
        console.log(result.status)
        if (result.status === 200) {
            alert("Signup successful")
            ReactDOM.render(<Index />, document.getElementById('app'));
        }
        else {
            alert("Existing username please try other ID");
        }
    }).catch((error) => {
        console.error(error, 'postRequest error');
    })
};

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { id: "", password: "" };
        this.handleSubmit = this.handleSignup.bind(this);
    }
  
    componentDidMount() {}

    handleInputChange = event => {
        this.setState({ [event.target.name] : event.target.value });
    };

    handleSignup(event) {
        postSend('http://localhost:5000/signup', this.state);
        event.preventDefault();
    }

    render() {
        return (
            <div className = "signup">
                <h1 className = "txtClr"> Create an Account</h1>
                <form onSubmit={this.handleSignup}>
                    <hr/>
                    <div className ="form-group">
                        <p>
                            user id:
                            <input  type="text" value = {this.state.id} onChange={this.handleInputChange} name="id" placeholder="Enter your ID..."  required />
                        </p>
                    </div>
                    <div className = "form-group">
                        <p>
                            Password:
                            <input type="text" value = {this.state.password} onChange={this.handleInputChange} name="password" placeholder="Enter your password" required />
                        </p>
                    </div>
                    <button className = "btn btn-success btnSignup" type="submit" value="Sign up"> Sign Up</button>
                </form>
            </div>
        )
    }
}

export default Signup;

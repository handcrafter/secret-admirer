import React, { Component } from 'react';
import NavLink from './components/NavLink.jsx';
import Saved from './components/savedImage.jsx';
import SearchImage from './components/searchImage.jsx'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            celebrity: "",
            isLoaded: false,
            username: "",
            isLogout: false
        }
        this.getUsername = this.getUsername.bind(this);
    }
    
    componentDidMount(){
        var searchCelebrity = this.props.celebrity;
        console.log('Searched: ' + searchCelebrity);
        this.setState({celebrity: searchCelebrity, isLoaded:true});
    }

    getUsername = (childData) => {
        this.setState({
            username: childData
        })
    }

    render() { 
        const { isLoaded } = this.state;
        return (
            <Router>
                <div>
                    <NavLink parentCallback = {this.getUsername}/>
                    <Switch>
                        <Route path="/saved" component={Saved}/>
                        {(isLoaded) ? <SearchImage celebrity={this.state.celebrity} username={this.state.username}/> : null}
                    </Switch>
                </div>  
            </Router>
        );
    }
}
 
export default Main;

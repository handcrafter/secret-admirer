import React, { Component } from 'react';
import NavLink from './components/NavLink.jsx';
import FindStar from './components/findStar.jsx';
import MyStar from './components/myStar.jsx';
import Saved from './components/saved.jsx';
import SearchImage from './components/searchImage.jsx'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class Main extends Component {
    state = {
        userSearched: "",
        isLoaded: false}

    componentDidMount(){
        var userSearch = this.props.data;
        console.log('searched: ' + userSearch);
        this.setState({userSearched: userSearch, isLoaded:true});
    }

    render() { 
        const { isLoaded } = this.state;
        return (
            <Router>
                <div>
                    <NavLink />
                    <Switch>
                        <Route path="/findstar" component={FindStar}/>
                        <Route path="/mystar" component={MyStar}/>
                        <Route path="/saved" component={Saved}/>
                        {isLoaded ? <SearchImage userSearched={this.state.userSearched}/> : null}
                    </Switch>
                </div>  
            </Router>
        );
    }
}
 
export default Main;

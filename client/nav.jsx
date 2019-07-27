import React, { Component } from 'react';
import NavLink from './components/NavLink.jsx';
import FindStar from './components/findStar.jsx';
import MyStar from './components/myStar.jsx';
import Saved from './components/savedImage.jsx';
import SearchImage from './components/searchImage.jsx'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class Main extends Component {
    state = {
        celebrity: "",
        isLoaded: false
    }

    componentDidMount(){
        var searchCelebrity = this.props.celebrity;
        console.log('Searched: ' + searchCelebrity);
        this.setState({celebrity: searchCelebrity, isLoaded:true});
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
                        {isLoaded ? <SearchImage celebrity={this.state.celebrity}/> : null}
                    </Switch>
                </div>  
            </Router>
        );
    }
}
 
export default Main;

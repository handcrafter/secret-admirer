import React, { Component } from 'react';
import Nav from './components/Nav.jsx';
import FindStar from './components/findStar.jsx';
import MyStar from './components/myStar.jsx';
import Saved from './components/saved.jsx';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class Main extends Component {
    render() { 
        return (
            <Router>
                <div>
                    <Nav />
                    <Switch>
                        <Route path="/findstar" exact component={FindStar}/>
                        <Route path="/mystar" component={MyStar}/>
                        <Route path="/saved" component={Saved}/>
                    </Switch>
                </div>  
            </Router>
        );
    }
}
 
export default Main;

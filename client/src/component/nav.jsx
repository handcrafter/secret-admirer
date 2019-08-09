import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavLink from './NavLink';
import Saved from './savedImage';
import SearchImage from './searchImage';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            celebrity: "",
            isLoaded: false,
            username: "",
            isLogout: false
        }
        this.getNavLinkData = this.getNavLinkData.bind(this);
    }
    
    componentDidMount(){
        var searchCelebrity = this.props.celebrity;
        console.log('Searched: ' + searchCelebrity);
        this.setState({celebrity: searchCelebrity, isLoaded:true});
    }

    getNavLinkData = (userData) => {
        if (!userData.celebrity) {
            this.setState({
                username: userData.username
            })
        } else {
            // Rerender search page when new state is updated
            this.setState({
                isLoaded: false
            }, () => {
                this.setState({
                    celebrity: userData.celebrity,
                    username: userData.username,
                    isLoaded: true
                })
            })
        }
    }

    render() { 
        const { isLoaded } = this.state;
        return (
            <Router>
                <div>
                    <NavLink parentCallback = {this.getNavLinkData}/>
                    <Switch>
                        {isLoaded ? <SearchImage celebrity={this.state.celebrity} username={this.state.username}/> : null}
                        <Route path="/saved" component={Saved}/>
                    </Switch>
                </div>  
            </Router>
        );
    }
}
 
export default Main;
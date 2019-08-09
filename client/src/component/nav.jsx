import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import NavLink from './NavLink';
import Saved from './savedImage';
import SearchImage from './searchImage';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searched: "",
            celebrity: "",
            isLoaded: false,
            username: "",
            isLogout: false,
            saved: false
        }
        this.getNavLinkData = this.getNavLinkData.bind(this);
    }
    
    componentDidMount(){
        var searchCelebrity = this.props.celebrity;
        console.log('Searched: ' + searchCelebrity);
        this.setState({celebrity: searchCelebrity, isLoaded:true, searched: searchCelebrity});
    }

    getNavLinkData = (userData) => {
        if (userData.saved) {
            this.setState({
                saved: userData.saved,
                isLoaded: false
            })
        } else {
            if (!userData.celebrity) {
                if (this.state.saved) {
                    this.setState({ 
                        username: userData.username,
                        saved: false,
                        isLoaded: true
                    });
                } else {
                    this.setState({ username: userData.username});
                }
            } else {
                this.setState({
                    saved: false,
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
    }

    render() { 
        const { isLoaded, saved } = this.state;
        return (
            <Router>
                <div>
                    <NavLink parentCallback = {this.getNavLinkData} celebrity={this.state.celebrity}/>
                    <Switch>
                        {saved ? 
                            <Saved username={this.state.username}/>
                        :
                            <div>
                                {isLoaded ? <SearchImage celebrity={this.state.celebrity} username={this.state.username}/> : null}
                            </div>
                        }
                    </Switch>
                </div>  
            </Router>
        );
    }
}
 
export default Main;
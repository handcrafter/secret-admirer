import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';

class Nav extends Component {
    render() { 
        return ( 
            <nav>
                <Link to="client/mainPage">
                    <h3 className="logo">Secret Admirer</h3>
                </Link>
                <ul className = "nav-links">  
                    <li ><NavLink to="/findstar" className="navStyle" activeClassName="current">Find My Star</NavLink></li>
                    <li><NavLink to="/mystar" className="navStyle" activeClassName="current">My Star</NavLink></li> 
                    <li><NavLink to="/saved" className="navStyle" activeClassName="current">Saved</NavLink></li> 
                </ul>
            </nav>
        );
    }
}
  
export default Nav;
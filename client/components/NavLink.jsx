import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';

class Nav extends Component {
    render() { 
        return ( 
            <nav className="navbar">
                <Link to="/">
                    <h3 className="logo">Secret Admirer</h3>
                </Link>
                <ul className = "nav-links">
                    <li><NavLink to="/findstar" className="navHeadings" activeClassName="current">Find My Star</NavLink></li>
                    <li><NavLink to="/mystar" className="navHeadings" activeClassName="current">My Star</NavLink></li> 
                    <li><NavLink to="/saved" className="navHeadings" activeClassName="current">Saved</NavLink></li> 
                </ul>
            </nav>
        );
    }
}
  
export default Nav;
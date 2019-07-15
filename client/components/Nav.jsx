import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
    render() { 
        return ( 
            <nav>
                <Link to="client/mainPage">
                    <h3 className="logo">Secret Admirer</h3>
                </Link>
                <ul className = "nav-links">
                    <Link className="navStyle" to="/findstar">
                        <li> Find your Star</li>
                    </Link>
                    <Link className="navStyle" to="/mystar">
                        <li>My star</li>
                    </Link>
                    <Link className="navStyle" to="/saved">
                        <li> Saved</li>
                    </Link>  
                </ul>
            </nav>
        );
    }
}
  
export default Nav;
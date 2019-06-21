import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
    render() { 
        return ( 
            <nav>
                <h3 href = "#">Secret Admirer</h3>
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
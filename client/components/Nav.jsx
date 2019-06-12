import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
    render() { 
        return ( 
            <nav>
                <h3>Secret Admirer</h3>
                <ul class = "nav-links">
                    <Link class="navStyle" to="/findstar">
                        <li> Find your Star</li>
                    </Link>
                    <Link class="navStyle" to="/mystar">
                        <li>My star</li>
                    </Link>
                    <Link class="navStyle" to="/saved">
                        <li> Saved</li>
                    </Link>  
                </ul>
            </nav>
         );
    }
}
  
export default Nav;
import React, { Component } from 'react';
import '../css/App.css';
import '../css/Dropdown.css';
import {Link} from 'react-router';

class Header extends Component {
    
    render() {
        return (
            <div className="Homepage-header">
                <Link id="homeButton" className="menuButton" to="/Home">Home</Link>
                <Link id="changeRequestButton" className="menuButton" to="/Changerequest">Change</Link>
            </div>
        )
    }
}

export default Header;
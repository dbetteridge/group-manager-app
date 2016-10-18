import React, { Component } from 'react';
import '../css/App.css';
import '../css/Dropdown.css';
import Header from './Header';
import GroupContainer from '../containers/GroupContainer';

class Homepage extends Component {
    render() {
        return (
        <div className="Homepage">
            <Header/>            
            <GroupContainer/>
        </div>
        );
    }
}

export default Homepage;
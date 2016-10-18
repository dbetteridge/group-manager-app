import React, { Component, PropTypes } from 'react'

export default class GroupDetails extends Component {
  render() {
    const { Name, ID, Office } = this.props

    return (
      <span>        
        <div>Name: {Name}</div>
        <div>EmployeeID: {ID}</div>
        <div>Office: {Office}</div>
        <br/>
      </span>
    )
  }
}

GroupDetails.propTypes = {  
  Name: PropTypes.string.isRequired,
  ID: PropTypes.number.isRequired,
  Office: PropTypes.string.isRequired
}
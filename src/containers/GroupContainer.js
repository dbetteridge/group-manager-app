import React from 'react';
import { connect } from 'react-redux'
import { selectGroup, fetchGroupDetailsIfNeeded } from '../actions/groupActions'
import { fetchGroupsIfNeeded } from '../actions/groupActions'
import '../css/App.css';
import '../css/Dropdown.css';
import Picker from '../components/Picker'
import GroupDetails from '../components/GroupDetails'


class GroupContainer extends React.Component{     
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)

    }
    
    componentDidMount() {
        const { dispatch, selectedGroup } = this.props
        dispatch(fetchGroupDetailsIfNeeded(selectedGroup))
        dispatch(fetchGroupsIfNeeded())
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedGroup !== this.props.selectedGroup) {
        const { dispatch, selectedGroup } = nextProps
        dispatch(fetchGroupDetailsIfNeeded(selectedGroup))
        }
    }

    handleChange(nextGroup){
        this.props.dispatch(selectGroup(nextGroup))
    }
       
    render() {
        
        const { isFetching, allGroups, selectedGroup,groupDetails } = this.props
        console.log(this.props)
        if(allGroups.grouplist && groupDetails.AuthorizedModifiers ){
        return (     
            <div>
                <Picker value={selectedGroup}
                        onChange={this.handleChange}
                        options={allGroups.grouplist.map(item=>{
                            return item.GroupName
                        })}       
                />                       
               <div>
                    <h1>Authorized Staff</h1>
                    <div>{groupDetails.AuthorizedModifiers.map(item=>{
                        return <GroupDetails Name={item.Name}
                                            Office={item.Office}
                                            ID={item.EmployeeID}
                                            key={item.EmployeeID}
                                />
                    })}
                    </div>
                </div>
            </div>            
        )
        }else{
            return (
                <div>
                 { !isFetching &&
                <div>EMPTY</div>
                }
                </div>
            )
        }
       
    } 
}

function mapStateToProps(state, ownProps){
    const { selectedGroup, detailsByGroup, allGroups } = state 
    const {
        isFetching,
        lastUpdated,
        details: groupDetails } = detailsByGroup[selectedGroup] || {
            isFetching: true,
            details: []
        }
      
    return {
        selectedGroup,
        groupDetails,
        isFetching,
        lastUpdated,
        allGroups
    }
}

export default connect(mapStateToProps)(GroupContainer);


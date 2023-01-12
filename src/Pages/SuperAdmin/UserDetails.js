import React from 'react'
import { useHistory } from 'react-router-dom';
import UserDetailsBLL from '../../Components/SuperAdmin/UserDetails';

function UserDetails(props) {
    const navigator = useHistory();
    if (props.location.state !== undefined) {
        var UID = props.location.state;
    }
    else {
        navigator.push("/employee");
    }
    return (
        <UserDetailsBLL UID={UID} />
    )
}

export default UserDetails
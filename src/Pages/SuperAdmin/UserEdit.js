import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import UserEditBLL from '../../Components/SuperAdmin/UserEdit';

function UserEdit(props) {
    const navigator = useHistory();
    if (props.location.state !== undefined)
        var UID = props.location.state;
    else {
        navigator.push("/employee");
    }
    return (
        <div>
            <UserEditBLL UID={UID} />
        </div>
    )
}

export default UserEdit
import React from 'react'
import { useHistory } from 'react-router-dom';
import AddContentBLL from '../../Components/Teacher/AddContent';

function AddContent(props) {
    const navigator = useHistory();
    if (props.location.state !== undefined) {
        var UID = props.location.state;
    }
    else {
        navigator.push("/Superadmin");
    }
    return (
        <div>
            <AddContentBLL UID={UID} />
        </div>
    )
}

export default AddContent
import React from 'react'
import { useHistory } from 'react-router-dom';
import SubjectEditBLL from '../../Components/SuperAdmin/SubjectEdit';

function SubjectEdit(props) {
    const navigator = useHistory();
    if (props.location.state !== undefined) {
        var UID = props.location.state;
    }
    else {
        navigator.push("/Superadmin");
    }
    return (
        <div>
            <SubjectEditBLL UID={UID} />
        </div>
    )
}

export default SubjectEdit
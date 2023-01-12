import React from 'react'
import { useHistory } from 'react-router-dom';
import TeacherEditBLL from '../../Components/SuperAdmin/TeacherEdit';

function TeacherEdit(props) {
    const navigator = useHistory();
    if (props.location.state !== undefined) {
        var UID = props.location.state;
    }
    else {
        navigator.push("/Superadmin");
    }
    return (
        <div>
            <TeacherEditBLL UID={UID} />
        </div>
    )
}

export default TeacherEdit
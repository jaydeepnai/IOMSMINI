import React from 'react'
import { useHistory } from 'react-router-dom';
import TeacherDetailsBLL from '../../Components/SuperAdmin/TeacherDetailsBLL';

function TeacherDetails(props) {
    const navigator = useHistory();
    if (props.location.state !== undefined) {
        var UID = props.location.state;
    }
    else {
        navigator.push("/Superadmin");
    }
    return (
        <div>
            <TeacherDetailsBLL UID={UID} />
        </div>
    )
}

export default TeacherDetails
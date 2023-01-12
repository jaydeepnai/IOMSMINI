import React from 'react'
import { useHistory } from 'react-router-dom';
import SubjectBLL from '../../Components/Student/SubjectBLL';
import AddContentBLL from '../../Components/Teacher/AddContent';

function Subject(props) {
    const navigator = useHistory();
    if (props.location.state !== undefined) {
        var UID = props.location.state;
    }
    else {
        navigator.push("/Superadmin/Subject");
    }
    return (
        <div>
            <SubjectBLL UID={UID} />
        </div>
    )
}

export default Subject
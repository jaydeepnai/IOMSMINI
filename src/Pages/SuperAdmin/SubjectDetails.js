import React from 'react'
import SubjectDetailsBLL from '../../Components/SuperAdmin/SubjectDetails'
import { useHistory } from 'react-router-dom';

function SubjectDetails(props) {
    const navigator = useHistory();
    if (props.location.state !== undefined) {
        var UID = props.location.state;
    }
    else {
        navigator.push("/employee");
    }
    return (
        <SubjectDetailsBLL UID={UID} />
    )
}

export default SubjectDetails
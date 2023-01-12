//#region imports
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import TeacherSubjectDetail from '../../DataRepository/SuperAdmin/GetTeacherSubject';
import SubjectListDR from '../../DataRepository/SuperAdmin/SubjectList';
import $ from "jquery"
import { ProgressContext } from '../../App';
import { useContext } from 'react';
//#endregion

function TeacherDetailsBLL({ UID }) {
    //#region variables
    const history = useHistory();
    const { setProgress } = useContext(ProgressContext)
    const [result, setResult] = useState([]);
    const [TeacherSubjects, setTeacherSubjects] = useState([]);
    //#endregion

    //#region function
    const GetData = async () => {
        setProgress(30)
        var result = await SubjectListDR();
        setProgress(60)
        var teacherSubjects = await TeacherSubjectDetail(UID);
        setProgress(80)
        if (result.data !== null) {
            setResult(result);
        }
        setProgress(90)
        if (teacherSubjects.data !== null) {
            setTeacherSubjects(teacherSubjects);
        }
        setProgress(100)
    };

    useEffect(() => {
        GetData();
    }, [])

    useEffect(() => {
        TeacherSubjects.map((data) => {
            $(`input[type=checkbox][id=${data.subjectId}]`).attr('checked', 'true')
        })
    }, [TeacherSubjects])

    //#endregion 
    //#region html
    return (
        <div className="content-wrapper ">
            <><h4 className="d-flex font-weight-bold h3 text-black title">
                &nbsp;&nbsp;User Subject Details
            </h4>
                <div className="mtCustom  tableContainer align-center">
                    <div className="form-row">
                        <h5>Subjects</h5>
                    </div>
                    <div className="form-row pb-3">
                        {
                            result.map((data) => (
                                <div className="col-6" key={data.id}>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id={`${data.id}`} disabled />
                                        <label className="custom-control-label" htmlFor={`${data.id}`}>{data.name}</label>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="">
                    <div className="mt-4 row d-flex col-sm cusMediaPad">
                        <button title="Edit Employee" className="btn btn-primary mr-2 btnCusPad" onClick={() => {
                            history.push("/SuperAdmin/Teacher/Edit", UID)
                        }}>Edit</button>
                        <button title="Go to Employee List" className="btn btn-primary btnCusPad ml-2" onClick={() => {
                            history.push("/SuperAdmin/AssignRole/Teacher")
                        }}>Cancel</button>
                    </div>
                </div></>
        </div>
    )
    //#endregion
}

export default TeacherDetailsBLL
//#region imports
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import TeacherSubjectDetail from '../../DataRepository/SuperAdmin/GetTeacherSubject';
import SubjectListDR from '../../DataRepository/SuperAdmin/SubjectList';
import $ from "jquery"
import UserSubjectEdit from '../../DataRepository/SuperAdmin/UserSubjectEdit';
import { Button } from '@mui/material';
import { ProgressContext } from '../../App';
import { useContext } from 'react';
//#endregion

function TeacherEditBLL({ UID }) {
    //#region variables
    const history = useHistory();
    const [result, setResult] = useState([]);
    const { setProgress } = useContext(ProgressContext)
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
        if (teacherSubjects !== null) {
            setTeacherSubjects(teacherSubjects);
        }
        setProgress(100)
    };

    useEffect(() => {
        GetData();
    }, [])

    useEffect(() => {
        TeacherSubjects.map((data) => {
            $("input[type=checkbox][id=" + data.id + "]").attr('checked', 'true')
        })
    }, [TeacherSubjects])

    const EditUser = async (e) => {
        setProgress(30)
        e.preventDefault();
        var SubjecArray = new Array();
        setProgress(60)
        $("input[type=checkbox]:checked").each((I, Element) => {
            SubjecArray.push(Element.id)
        })
        setProgress(90)
        var result = await UserSubjectEdit(
            {
                id: UID,
                subejects: SubjecArray
            }
        )
        history.push("/SuperAdmin/AssignRole/Teacher");
        setProgress(100)
    };

    //#endregion 
    //#region html
    return (
        <div className="content-wrapper ">
            <><h4 className="d-flex font-weight-bold h3 text-black title">
                &nbsp;&nbsp;Edit User Subject
            </h4>
                <form className="forms-sample card-body"
                    onSubmit={EditUser}
                >
                    <div className="mtCustom  tableContainer align-center">
                        <div className="form-row">
                            <h5>Subjects</h5>
                        </div>
                        <div className="form-row pb-3">
                            {
                                result.map((data) => (
                                    <div className="col-6" key={data.id}>
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id={`${data.id}`} />
                                            <label className="custom-control-label" htmlFor={`${data.id}`}>{data.name}</label>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="">
                        <div className="mt-4 row d-flex col-sm cusMediaPad">
                            <Button size='large' variant='contained' sx={{ width: "100px" }} className="btn btn-primary mr-2 btnCusPad" title="Edit Employee" type="submit">Save</Button>
                            <Button title="Go to Employee List" className="btn btn-primary mr-2 btnCusPad" variant='contained' size='large' sx={{ width: "100px" }} onClick={() => {
                                history.push("/SuperAdmin/AssignRole/Teacher")
                            }}>Cancel</Button>
                        </div>
                    </div>
                </form></>
        </div>
    )
    //#endregion
}

export default TeacherEditBLL
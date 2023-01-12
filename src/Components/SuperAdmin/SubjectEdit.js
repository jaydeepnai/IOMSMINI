//#region imports
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ProgressContext } from '../../App';
import { onChange } from '../../Common/Helper';
import SubjectDetail from '../../DataRepository/SuperAdmin/SubjectDetails';
import SubjectEdit from '../../DataRepository/SuperAdmin/SubjectUpdate';
//#endregion

function SubjectEditBLL({ UID }) {
    //#region variables
    const [User, setUser] = useState({ id: '', name: '', description: '', isDeleted: true });
    const { setProgress } = useContext(ProgressContext)
    const history = useHistory();
    //#endregion

    //#region function
    const getDetails = async () => {
        setProgress(30)
        var result = await SubjectDetail({ id: UID })
        setProgress(60)
        setUser(
            {
                id: result.id,
                name: result.name,
                description: result.description,
                isDeleted: result.isDeleted,
            }
        );
        setProgress(100)
    }

    useEffect(() => {
        getDetails();
    }, [])

    const EditUser = async (e) => {
        setProgress(30)
        e.preventDefault();
        setProgress(60)
        var result = await SubjectEdit(
            {
                id: User.id,
                name: User.name,
                description: User.description,
                isDeleted: User.isDeleted,
            }
        )
        setProgress(90)
        history.push("/SuperAdmin/Subject");
        setProgress(100)
    };

    //#endregion 
    //#region html
    return (
        <div className="content-wrapper ">
            <><h4 className="d-flex font-weight-bold h3 text-black title">
                &nbsp;&nbsp;Edit Subject
            </h4>
                <form className="forms-sample card-body"
                    onSubmit={EditUser}
                >
                    <div className="mtCustom  tableContainer align-center">
                        <div className="form-row">
                            <div className="mb-3 col-lg-4 mt-3 col-md-6 col-xs-12">
                                <TextField label="Subject Name" variant="outlined" size='small' type="text" name="name" className="form-control" id="exampleInputUsername1" placeholder="Username" value={User.name} onChange={(e) => onChange(e, User, setUser)} autoFocus required />
                                <div className="invalid-tooltip">
                                    Please provide a valid city.
                                </div>
                            </div>
                            <div className="form-group col-lg-4 mt-3 col-md-6 col-xs-12">
                                <TextField label="Description" variant="outlined" size='small' type="text" name="description" className="form-control" id="exampleInputUsername2" placeholder="Last Name" value={User.description} onChange={(e) => onChange(e, User, setUser)} required />
                            </div>
                            <div className="form-group col-lg-4 pl-4 col-md-6 col-xs-12">
                                <FormControlLabel control={<Checkbox name="isDeleted" className="form-control" id="exampleInputUsername1" checked={User.isDeleted} onChange={(e) => setUser({ ...User, isDeleted: !User.isDeleted })} />} label="Deleted" />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="mt-4 row d-flex col-sm cusMediaPad">
                            <Button size='large' sx={{ width: "100px" }} title="Edit Employee" type="submit" className="btn btn-primary mr-2 btnCusPad" >Save</Button>
                            <Button size='large' sx={{ width: "100px" }} title="Go to Employee List" className="btn btn-primary btnCusPad ml-2" onClick={() => {
                                history.push("/SuperAdmin/Subject")
                            }}>Cancel</Button>
                        </div>
                    </div>
                </form></>
        </div >
    )
    //#endregion
}

export default SubjectEditBLL
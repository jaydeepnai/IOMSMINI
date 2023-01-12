//#region imports
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { ProgressContext } from '../../App';
import SubjectDetail from '../../DataRepository/SuperAdmin/SubjectDetails';
//#endregion

function SubjectDetailsBLL({ UID }) {
    //#region variables
    const [User, setUser] = useState({ id: '', name: '', description: '', isDeleted: true });
    const { setProgress } = useContext(ProgressContext)
    const history = useHistory();
    //#endregion

    //#region functions
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
    //#endregion

    //#region html
    return (
        <div className="content-wrapper ">
            <><h4 className="d-flex font-weight-bold h3 text-black title">
                &nbsp;&nbsp;Subject Details
            </h4>
                <form className="forms-sample card-body"
                // onSubmit={EditUser}
                >
                    <div className="mtCustom  tableContainer align-center">
                        <div className="form-row">
                            <div className="mb-3 col-lg-4 mt-3 col-md-6 col-xs-12">
                                <TextField label="Subject Name" variant="outlined" size='small' type="text" name="name" className="form-control" id="exampleInputUsername1" placeholder="Username" value={User.name} autoFocus disabled />
                                <div className="invalid-tooltip">
                                    Please provide a valid city.
                                </div>
                            </div>
                            <div className="form-group col-lg-4 mt-3 col-md-6 col-xs-12">
                                <TextField label="Description" variant="outlined" size='small' type="text" name="description" className="form-control" id="exampleInputUsername2" placeholder="Last Name" value={User.description} disabled />
                            </div>
                            <div className="form-group col-lg-4 col-md-6 mt-3 col-xs-12">
                                <FormControlLabel control={<Checkbox name="isDeleted" className="form-control" id="exampleInputUsername1" checked={User.isDeleted} onChange={(e) => setUser({ ...User, isDeleted: !User.isDeleted })} />} label="Deleted" disabled />
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

export default SubjectDetailsBLL
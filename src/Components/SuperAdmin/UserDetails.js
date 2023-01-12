//#region imports
import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { ProgressContext } from '../../App';
import UserDetail from '../../DataRepository/SuperAdmin/UserDetail';
import Roles from '../../DataRepository/User/Roles';
//#endregion

function UserDetailsBLL({ UID }) {
    //#region variables
    const [User, setUser] = useState({ id: '', name: '', userName: '', email: '', roleID: '' });
    const [Role, setRole] = useState({ id: '', name: '', description: "" });
    const [pageError, setPageError] = useState("")
    const [error, setError] = useState(false)
    const { setProgress } = useContext(ProgressContext)
    const history = useHistory();
    //#endregion

    //#region functions
    const getDetails = async () => {
        setProgress(30)
        var ComplateRespnse = await UserDetail({ id: UID })
        setProgress(60)
        var result = ComplateRespnse;
        var UserRole = await Roles(result.roleID);
        setProgress(90)
        setRole(UserRole)
        setUser(
            {
                id: result.id,
                name: result.name,
                userName: result.userName,
                roleID: Role.id,
                email: result.email == "" || result.email == null ? "Not Available" : result.email,
            }
        );
    }
    setProgress(100)
    useEffect(() => {
        getDetails();
    }, [])
    //#endregion

    //#region html
    return (
        <div className="content-wrapper ">
            {!error ? (<> <div className="d-flex align-items-center">
                <h4 className="d-flex font-weight-bold h3 text-black title">
                    User Details
                </h4>
            </div>
                <form className="forms-sample card-body" >
                    <div className="mtCustom  tableContainer align-center">
                        <div className="form-row">
                            <div className="mb-3 mt-3 col-lg-4 col-md-6 col-xs-12">
                                <TextField label="Name" variant="outlined" size='small' type="text" name="name" className="form-control" id="exampleInputUsername1" placeholder="Username" value={User.name} disabled />
                                <div className="invalid-tooltip">
                                    Please provide a valid city.
                                </div>
                            </div>
                            <div className="form-group mt-3 col-lg-4 col-md-6 col-xs-12">
                                <TextField label="User Name" variant="outlined" size='small' type="text" name="LastName" className="form-control" id="exampleInputUsername2" placeholder="Last Name" value={User.userName} disabled required />
                            </div>
                            <div className="form-group mt-3 col-lg-4 col-md-6 col-xs-12">
                                <TextField label="Email" variant="outlined" size='small' type="text" name="Title" className="form-control" id="exampleInputUsername1" placeholder="Title" value={User.email} disabled />
                            </div>
                            <div className="form-group col-lg-4 col-md-6 col-xs-12">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <label htmlFor="exampleInputUsername4">Role&nbsp; <span style={{ color: 'red' }}> *</span>
                                    </label>
                                </div>
                                <select class="custom-select" value={Role.id} disabled>
                                    <option >select menu</option>
                                    <option value="3">Admin</option>
                                    <option value="4">Teacher</option>
                                    <option value="6">Student</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="">
                    <div className="mt-4 row d-flex col-sm cusMediaPad">
                        <Button title="Edit User" onClick={() => {
                            history.push("Edit", UID)
                        }} type="submit" className="btn btn-primary mr-2 btnCusPad" size='large' sx={{ width: "100px" }}>Edit</Button>
                        <Button size='large' sx={{ width: "100px" }} title="Go to User List" className="btn btn-primary btnCusPad ml-2" onClick={() => {
                            history.push("/SuperAdmin")
                            // window.location.reload(false);
                        }}>Back</Button>
                    </div>
                </div></>) :
                <div className="alert alert-danger" style={{ border: "2px solid #edb8b8" }} role="alert">
                    {pageError}
                </div>}
        </div>
    )
    //#endregion
}

export default UserDetailsBLL
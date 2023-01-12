//#region imports
import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ProgressContext } from '../../App';
import { onChange } from '../../Common/Helper';
import UserDetail from '../../DataRepository/SuperAdmin/UserDetail';
import UserEdit from '../../DataRepository/SuperAdmin/UserEdit';
import Roles from '../../DataRepository/User/Roles';
//#endregion

function UserEditBLL({ UID }) {
    //#region variables
    const [User, setUser] = useState({ id: '', name: '', userName: '', email: '', roleID: '' });
    const [pageError, setPageError] = useState('');
    const [Role, setRole] = useState({ id: '', name: '', description: "" });
    const [NotFounderror, setNotFounderror] = useState(false)
    const [error, setError] = useState(false)
    const history = useHistory();
    const [memberrolesdata, setMemberRolesData] = useState([]);
    const [addroles, setAddRoles] = useState([]);
    const { setProgress } = useContext(ProgressContext)
    //#endregion

    //#region function
    const getDetails = async () => {
        setProgress(30)
        var result = await UserDetail({ id: UID })
        setProgress(60)
        var UserRole = await Roles(result.roleID);
        setProgress(90)
        setRole(UserRole)
        setUser(
            {
                id: result.id,
                name: result.name,
                userName: result.userName,
                email: result.email == "" || result.email == null ? "Not Available" : result.email,
            }
        );
        setProgress(100)
    }
    useEffect(() => {
        getDetails();
    }, [])
    useEffect(() => {
        setUser({ ...User, roleID: Role.id, })
    }, [Role])
    const EditUser = async (e) => {
        setProgress(40)
        e.preventDefault();
        var result = await UserEdit(
            {
                id: User.id,
                name: User.name,
                userName: User.userName,
                email: User.email,
                password: User.password,
                roleID: User.roleID,
                isDeleted: false
            }
        )
        history.push("/SuperAdmin");
        setProgress(100)
    };
    //#endregion 
    //#region html
    return (
        <div className="content-wrapper ">
            {!NotFounderror ? <><h4 className="d-flex font-weight-bold h3 text-black title">
                &nbsp;&nbsp;Edit User
            </h4>
                <form className="forms-sample card-body"
                    onSubmit={EditUser}
                >
                    <div className="mtCustom  tableContainer align-center">
                        <div className="form-row">
                            <div className="form-group mb-3 mt-3 col-lg-4 col-md-6 col-xs-12">
                                <TextField label="Name" variant="outlined" size='small' type="text" name="name" className="form-control" id="exampleInputUsername1" placeholder="Username" value={User.name} onChange={(e) => onChange(e, User, setUser)} autoFocus required />
                                <div className="invalid-tooltip">
                                    Please provide a valid city.
                                </div>
                            </div>
                            <div className="form-group mt-3 col-lg-4 col-md-6 col-xs-12">
                                <TextField label="User Name" variant="outlined" size='small' type="text" name="userName" className="form-control" id="exampleInputUsername2" placeholder="Last Name" value={User.userName} onChange={(e) => onChange(e, User, setUser)} required />
                            </div>
                            <div className="form-group mt-3 col-lg-4 col-md-6 col-xs-12">
                                <TextField label="Email" variant="outlined" size='small' type="text" name="email" className="form-control" id="exampleInputUsername1" placeholder="Title" value={User.email} onChange={(e) => onChange(e, User, setUser)} />
                            </div>
                            <div className="form-group col-lg-4 col-md-6 col-xs-12">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <label htmlFor="exampleInputUsername4">Role&nbsp; <span style={{ color: 'red' }}> *</span>
                                    </label>
                                </div>
                                <select class="custom-select" name="roleID" value={User.roleID} onChange={(e) => onChange(e, User, setUser)} >
                                    <option >select menu</option>
                                    <option value="3">Admin</option>
                                    <option value="4">Teacher</option>
                                    <option value="6">Student</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="mt-4 row d-flex col-sm cusMediaPad">
                            <Button title="Edit Employee" type="submit" className="btn btn-primary mr-2 btnCusPad" size='large' sx={{ width: "100px" }}>Save</Button>
                            <Button size='large' sx={{ width: "100px" }} title="Go to Employee List" className="btn btn-primary btnCusPad ml-2" onClick={() => {
                                history.push("/SuperAdmin")
                            }}>Cancel</Button>
                        </div>
                    </div>
                </form></> : <div class="alert alert-danger" style={{ border: "2px solid #edb8b8" }} role="alert">
                {pageError}
            </div>}
        </div>
    )
    //#endregion
}

export default UserEditBLL
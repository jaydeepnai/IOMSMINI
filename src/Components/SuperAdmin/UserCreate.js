//#region imports
import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { ProgressContext } from '../../App';
import { onChange } from '../../Common/Helper';
import UserCreate from '../../DataRepository/SuperAdmin/UserCreate';
//#endregion

function UserCreateBLL({ Title }) {
    //#region
    const [User, setUser] = useState({ id: '', name: '', userName: '', email: '', password: '', roleID: '', });
    const { setProgress } = useContext(ProgressContext)
    const history = useHistory();
    //#endregion


    const insertUser = async (e) => {
        setProgress(30)
        e.preventDefault();
        var result = await UserCreate({
            id: User.id, name: User.name, userName: User.userName, email: User.email, password: User.password, roleID: User.roleID,
        })
        setProgress(60)
        history.push("/");
        setProgress(100)
    };
    //#endregion

    //#region html
    return (
        <div className="content-wrapper ">
            <h4 className="d-flex font-weight-bold title h3 text-black">
                &nbsp;Create User
            </h4>
            <form className="forms-sample card-body "
                onSubmit={insertUser}
            >
                <div className="mtCustom tableContainer  forms-sample align-center">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 mt-2 col-xs-12 form-group ">
                            <TextField label="First Name" variant="outlined" size='small' type="text" name="name" className="form-control" id="fName" placeholder="First Name" value={User.name} onChange={(e) => onChange(e, User, setUser)} autoFocus required />
                            <div className="invalid-tooltip">
                                Please provide name.
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mt-2  col-xs-12 form-group">
                            <TextField label="Email" variant="outlined" size='small' type="text" name="email" className="form-control" id="Email" placeholder="Email" value={User.email} onChange={(e) => onChange(e, User, setUser)} />
                        </div>
                        <div className="col-lg-4 col-md-6  col-xs-12 form-group">

                            <select class="custom-select w-100" name="roleID" value={User.roleID} onChange={(e) => onChange(e, User, setUser)} style={{ height: "50px" }}>
                                <option >select menu</option>
                                <option value="3">Admin</option>
                                <option value="4">Teacher</option>
                                <option value="6">Student</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mtCustom tableContainer align-center mt-3 mb-3">
                    <div className="row card-body">
                        <div className=" mt-2 col-lg-4 col-md-6 col-xs-12 form-group">
                            <TextField label="User Name" variant="outlined" size='small' type="text" name="userName" className="form-control" id="userName" placeholder="Username" value={User.userName} onChange={(e) => onChange(e, User, setUser)} />
                        </div>
                        <div className="col-lg-4  mt-2 col-md-6 col-xs-12 form-group">
                            <TextField label="Password" variant="outlined" size='small' type="password" name="password" className="form-control" id="password" placeholder="Password" value={User.password} onChange={(e) => onChange(e, User, setUser)} />
                        </div>
                    </div>
                </div>
                <div className='row d-flex col-sm cusMediaPad'>
                    <Button title='Create Employee'
                        data-toggle="tooltip" data-placement="top" type="submit" className="btn btn-primary mr-2 btnCusPad" size='large' sx={{ width: "100px" }}
                    >Save</Button>
                    <Button title='Go to List' sx={{ width: "100px" }}
                        className="btn btn-primary btnCusPad ml-2" onClick={() => {
                            history.push("/SuperAdmin")
                            // window.location.reload(false);
                        }}>Cancel</Button>
                </div>
            </form>
            <script src="http://localhost:3000/assets/vendors/js/vendor.bundle.base.js"></script>
            <script src="http://localhost:3000/assets/js/off-canvas.js"></script>
            <script src="http://localhost:3000/assets/js/hoverable-collapse.js"></script>
            <script src="http://localhost:3000/assets/js/misc.js"></script>
        </div>
    )
    //#endregion
}

export default UserCreateBLL
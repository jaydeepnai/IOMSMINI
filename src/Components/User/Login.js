//#region imports
import React from 'react'
import { useState } from 'react';
import Login from '../../DataRepository/User/Login';
import { useHistory } from "react-router-dom";
import Roles from '../../DataRepository/User/Roles';
import { Button, TextField } from '@mui/material';
import { ProgressContext } from '../../App';
import { useContext } from 'react';
//#endregion

function LoginBox(props) {
    //#region variables
    const [login, setLogin] = useState({ Email: '', Password: '' });
    const [IsError, setIsError] = useState(false);
    const [message, setMessage] = useState('')
    const { progress, setProgress } = useContext(ProgressContext)
    let history = useHistory();
    //#endregion

    //#region methods
    async function CheckLogin(e) {
        setProgress(10);
        e.preventDefault();
        const loginInfo = { Email: login.Email, Password: login.Password, navigation: history };
        setProgress(30);
        var result = await Login(loginInfo);
        setProgress(60);
        const Role = await Roles(result.roleID)
        setProgress(80);
        var userModel = { user: result, role: Role }
        localStorage.setItem("userModel", JSON.stringify(userModel));
        if (Role.name == "Super Admin") history.push("/SuperAdmin");
        if (Role.name == "Admin") history.push("/Admin");
        if (Role.name == "Teacher") history.push("/Teacher");
        if (Role.name == "Student") history.push("/Student");
        setProgress(100);
    }

    function validateForm() {
        return login.Password.length > 0 && login.Email.length > 0;
    }
    //#endregion

    //#region html
    return (
        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth">
                    <div className="row flex-grow">
                        <div className="col-lg-4 mx-auto">
                            <div className="shadow  bg-body rounded auth-form-light text-left p-5">
                                <div className="brand-logo text-center">
                                    <img src="http://localhost:3000/assets/images/IOMSLogo.png" height={80} width={60} />
                                </div>
                                <h4>Hello! let's get started</h4>
                                <h6 className="font-weight-light">Login in to continue.</h6>
                                <form className="pt-3" >
                                    <div className="form-group">
                                        {IsError ? <div className='pb-2' style={{ color: 'red' }}>{message}</div> : ("")}
                                        <TextField
                                            placeholder='Email' size='small' id="Email" label="Email" variant="outlined" type="text" name="name" className="form-control" required value={login.Email} onChange={(e) => setLogin({ Password: login.Password, Email: e.target.value })} autoFocus />
                                    </div>
                                    <div className="form-group">
                                        <TextField title="Password" size='small' label="Password" type="password" className="form-control form-control-lg mb-2" id="exampleInputPassword1" placeholder="Password" required value={login.Password} onChange={(e) => setLogin({ Password: e.target.value, Email: login.Email })} />
                                    </div>
                                    <div className="mt-3">
                                        <Button variant='contained' style={{ color: "white", backgroundColor: "#696cff" }} title="login" className="btn btn-block btn-lg auth-form-btn" disabled={!validateForm()} href="../../index.html" onClick={CheckLogin}>LOG IN</Button>
                                    </div>
                                    <div className="my-2 d-flex justify-content-between align-items-center">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    //#endregion
}

export default LoginBox
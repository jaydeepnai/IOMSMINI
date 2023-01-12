import React from 'react'
import { useHistory } from 'react-router-dom';
import { RiMapPinUserFill } from 'react-icons/ri';
import { FaExchangeAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserIfNull } from '../../Common/Helper';
import { useEffect } from 'react';
import $ from 'jquery';
import { toast } from 'react-toastify';
import { ProgressContext } from '../../App';
import { useContext } from 'react';
import { useState } from 'react';

function Navbar(props) {
    const navigation = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    const { progress, setProgress } = useContext(ProgressContext)
    const history = useHistory()

    useEffect(() => {
        setName(JSON.parse(localStorage.getItem("userModel")).user.name);
    }, [])

    const logout = () => {
        setProgress(40)
        setTimeout(() => {
            localStorage.removeItem('userModel');
            setProgress(80)
            navigation.push('/login');
            toast.info("Log out")
            setProgress(100)
        }, 1000);
    }
    const ChangePassword = () => {
        navigation.push('/ChangePassword');
    }
    const UpdateProfile = () => {
        history.goBack()
        // navigation.push('/EmployeeProfile');
    }

    return (
        <div>
            <div className="shadow-lg p-3 mb-4 bg-body rounded" >
                <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                    <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                        <a className="navbar-brand brand-logo" href="index.html"><img src="http://localhost:3000/assets/images/iomslogo.png" alt="logo" /></a>
                    </div>
                    <div className="navbar-menu-wrapper d-flex align-items-stretch">
                        <button
                            className=" r navbar-toggler align-self-center" type="button" data-toggle="minimize">
                            <span className="mdi mdi-menu cus"
                            ></span>
                        </button>
                        <div className="search-field d-none d-md-block">
                            <form className="d-flex align-items-center h-100" action="#">
                                <div className="input-group">
                                    <div className="input-group-prepend bg-transparent">
                                        <i className="input-group-text border-0 mdi mdi-magnify"></i>
                                    </div>
                                    <input type="text" className="form-control bg-transparent border-0" placeholder="Search " />
                                </div>
                            </form>
                        </div>
                        <ul className="navbar-nav navbar-nav-right">
                            <li className="nav-item d-none d-lg-block full-screen-link cusPadNI">
                                <a className="nav-link">
                                    <i className="mdi mdi-fullscreen" id="fullscreen-button"></i>
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
                                    <i className="mdi mdi-bell-outline"></i>
                                    <span className="count-symbol bg-danger"></span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                                    <h6 className="p-3 mb-0">Notifications</h6>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item preview-item">
                                        <div className="preview-thumbnail">
                                            <div className="preview-icon bg-success">
                                                <i className="mdi mdi-calendar"></i>
                                            </div>
                                        </div>
                                        <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                            <h6 className="preview-subject font-weight-normal mb-1">Event today</h6>
                                            <p className="text-gray ellipsis mb-0"> Just a reminder that you have an event today </p>
                                        </div>
                                    </a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item preview-item">
                                        <div className="preview-thumbnail">
                                            <div className="preview-icon bg-warning">
                                                <i className="mdi mdi-settings"></i>
                                            </div>
                                        </div>
                                        <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                            <h6 className="preview-subject font-weight-normal mb-1">Settings</h6>
                                            <p className="text-gray ellipsis mb-0"> Update dashboard </p>
                                        </div>
                                    </a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item preview-item">
                                        <div className="preview-thumbnail">
                                            <div className="preview-icon bg-info">
                                                <i className="mdi mdi-link-variant"></i>
                                            </div>
                                        </div>
                                        <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                            <h6 className="preview-subject font-weight-normal mb-1">Launch Admin</h6>
                                            <p className="text-gray ellipsis mb-0"> New admin wow! </p>
                                        </div>
                                    </a>
                                    <div className="dropdown-divider"></div>
                                    <h6 className="p-3 mb-0 text-center">See all notifications</h6>
                                </div>
                            </li>
                            <li className="nav-item nav-profile dropdown cursor-pointer">
                                <a className="nav-link dropdown-toggle" id="profileDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                                    <div className="nav-profile-img">
                                        <img src="http://localhost:3000/assets/images/favicon.png" alt="image" style={{ height: "20px", width: "20px" }} className="ml-4" />
                                    </div>
                                    <div className="nav-profile-text">
                                        <p className="mb-1 text-black">{name}</p>
                                    </div>
                                </a>
                                <div className="dropdown-menu navbar-dropdown cusPopPad" aria-labelledby="profileDropdown">
                                    <a className="dropdown-item" href="#">
                                        <i className="mdi mdi-cached mr-2 text-success"></i> Activity Log </a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" onClick={UpdateProfile}>
                                        <RiMapPinUserFill />&nbsp; Profile </a>
                                    <a className="dropdown-item" onClick={ChangePassword}>
                                        <FaExchangeAlt />&nbsp; Change Password </a>
                                    <a className="dropdown-item" onClick={logout}>
                                        <i className="mdi mdi-logout mr-2 text-primary"></i> Signout </a>
                                </div>
                            </li>
                        </ul>
                        <button className="redux navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                            <span className="mdi mdi-menu"></span>
                        </button>
                    </div>
                </nav>
            </div>

        </div>
    )
}

export default Navbar
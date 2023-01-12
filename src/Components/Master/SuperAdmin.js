import React, { useState } from 'react'
import { FaUserEdit } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
function SuperAdminSidebar({ ComponentR }) {
    const navigation = useHistory();
    const [modulelist, setModulelist] = useState([])

    return (
        <nav className="sidebar sidebar-offcanvas zIndex" id="sidebar">
            <ul className="nav">
                <li className="">
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="#ui-basic">
                        <span className="menu-title">
                            Users
                        </span>
                        <i className="menu-arrow"></i>
                        <FaUserEdit className="" size={20} style={{ color: "#bba8bff5" }} />
                    </a>
                    <div className="collapse CusLiHover" id={`ui-basic`}>
                        <ul className="nav flex-column sub-menu navSub">
                            <li className="nav-item dropdown ">

                                <a className="dropdown-item preview-item count-indicator nav-link nav sub-menu"
                                    onClick={() => {
                                        navigation.push('/SuperAdmin');
                                    }}
                                >
                                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center cusNavItem">
                                        <span className=" count-symbol text-primary bg-danger sideCusMar" ></span> &nbsp;
                                        <div>User List</div>
                                    </div>
                                </a>
                            </li>
                            <li className="nav-item dropdown">

                                <a className="dropdown-item preview-item count-indicator nav-link nav sub-menu"
                                    onClick={() => {
                                        navigation.push('/SuperAdmin/User/Create');
                                    }}
                                >
                                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center cusNavItem">
                                        <span className=" count-symbol text-primary bg-danger sideCusMar" ></span> &nbsp;
                                        <div>Create User</div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#ui-basic1" aria-expanded="false" aria-controls="#ui-basic1">
                        <span className="menu-title">
                            Subjects
                        </span>
                        <i className="menu-arrow"></i>
                        <FaUserEdit className="" size={20} style={{ color: "#bba8bff5" }} />
                    </a>
                    <div className="collapse CusLiHover" id={`ui-basic1`}>
                        <ul className="nav flex-column sub-menu navSub">
                            <li className="nav-item dropdown">

                                <a className="dropdown-item preview-item count-indicator nav-link nav sub-menu"
                                    onClick={() => {
                                        navigation.push('/SuperAdmin/Subject');
                                    }}
                                >
                                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center cusNavItem">
                                        <span className=" count-symbol text-primary bg-danger sideCusMar" ></span> &nbsp;
                                        <div>Subjects List</div>
                                    </div>
                                </a>
                            </li>
                            <li className="nav-item dropdown">

                                <a className="dropdown-item preview-item count-indicator nav-link nav sub-menu"
                                    onClick={() => {
                                        navigation.push('/SuperAdmin/Subject/Create');
                                    }}
                                >
                                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center cusNavItem">
                                        <span className=" count-symbol text-primary bg-danger sideCusMar" ></span> &nbsp;
                                        <div>Create Subjects</div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#ui-basic2" aria-expanded="false" aria-controls="#ui-basic2">
                        <span className="menu-title">
                            Assign Role
                        </span>
                        <i className="menu-arrow"></i>
                        <FaUserEdit className="" size={20} style={{ color: "#bba8bff5" }} />
                    </a>
                    <div className="collapse CusLiHover" id={`ui-basic2`}>
                        <ul className="nav flex-column sub-menu navSub">
                            <li className="nav-item dropdown">

                                <a className="dropdown-item preview-item count-indicator nav-link nav sub-menu"
                                    onClick={() => {
                                        navigation.push('/SuperAdmin/AssignRole/Teacher');
                                    }}
                                >
                                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center cusNavItem">
                                        <span className=" count-symbol text-primary bg-danger sideCusMar" ></span> &nbsp;
                                        <div>Teachers List</div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul >
        </nav >
    )
}

export default SuperAdminSidebar
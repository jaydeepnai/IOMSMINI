import React from 'react'
import { FaUserEdit } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

function StudentSidebar({ ComponentR }) {
    const navigation = useHistory();

    return (
        <nav className="sidebar sidebar-offcanvas zIndex" id="sidebar">
            <ul className="nav">
                <li className="">
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="#ui-basic">
                        <span className="menu-title">
                            Student
                        </span>
                        <i className="menu-arrow"></i>
                        <FaUserEdit className="" size={20} style={{ color: "#bba8bff5" }} />
                    </a>
                    <div className="collapse CusLiHover" id={`ui-basic`}>
                        <ul className="nav flex-column sub-menu navSub">
                            <li className="nav-item dropdown ">

                                <a className="dropdown-item preview-item count-indicator nav-link nav sub-menu"
                                    onClick={() => {
                                        navigation.push('/Student');
                                    }}
                                >
                                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center cusNavItem">
                                        <span className=" count-symbol text-primary bg-danger sideCusMar" ></span> &nbsp;
                                        <div>Subject List</div>
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

export default StudentSidebar
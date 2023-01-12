import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import DynemicModuleList from '../../DataRepository/General/DynemicModuleList';
import ChaildMenu from './ChaildMenu';

function SubModule(props) {
    const navigation = useHistory();
    const [submenu, setSubmenu] = useState([])
    const getSubModuleList = async (id) => {
        var result = await DynemicModuleList({ id: props.id, navigation: navigation })
        setSubmenu(result);
    }
    useEffect(() => {
        getSubModuleList()
    }, [])
    return (
        <>
            {
                submenu?.map((item, idy) => (
                    <ul className="nav flex-column sub-menu">
                        <li className="nav-item dropdown">
                            {item.pageURL != "" ? (
                                <a className="dropdown-item preview-item count-indicator nav-link nav sub-menu"
                                    onClick={() => {
                                        navigation.push(`${item.pageURL}`);
                                    }}
                                // href={`${item.pageURL}`}
                                >
                                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center" style={{
                                        display: "flex"
                                    }}>
                                        <span className=" count-symbol text-primary bg-danger"></span> &nbsp; {item.moduleName}
                                    </div>
                                </a>
                            ) : (<>
                                <a className="nav-link text-primary count-indicator dropdown-toggle" id="submenu" style={{ justifyContent: "left", cursor: "pointer" }} data-toggle="dropdown">
                                    {item.moduleName}
                                    <span className=" count-symbol text-primary bg-danger"></span>
                                </a>
                                <ChaildMenu id={item.moduleID} name={item.moduleName} />
                            </>)}

                        </li>
                    </ul>
                ))
            }</>
    )
}

export default SubModule
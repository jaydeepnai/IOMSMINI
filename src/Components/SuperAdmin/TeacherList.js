//#region imports
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MdOutlineAddCircle } from 'react-icons/md';
import { FaEdit, FaClipboardList } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import '../../Switch.css';
import SubjectDelete from '../../DataRepository/SuperAdmin/SubjectDelete';
import TeacherListDR from '../../DataRepository/SuperAdmin/TeacherList';
import { Fab } from '@mui/material';
import { ProgressContext } from '../../App';
import { useContext } from 'react';

//#endregion

function TeacherList({ Title }) {
    //#region variables
    const { setProgress } = useContext(ProgressContext)
    const navigation = useHistory();
    const [result, setResult] = useState([])
    //#endregion

    //#region functions
    const deleteSubject = async (ID) => {
        setProgress(30)
        if (window.confirm('You want to delette ?')) {
            var response = await SubjectDelete({ ID: ID, navigation: navigation })
            setProgress(60)
            let index = result.findIndex((item) => item.id === ID)
            if (index >= 0) {
                result.splice(index, 1);
                setResult([...result]);
                setProgress(100)
            }
        }
    }
    const GetData = async () => {
        setProgress(30)
        var result = await TeacherListDR();
        setProgress(60)
        if (result.data !== null) {
            setResult(result);
        }
        setProgress(100)
    };
    useEffect(() => {
        GetData();
    }, []);


    //#endregion

    //#region html
    return (
        // <div className="">
        <div className='content-wrapper'>
            <div className='mtCustom '>
                <div className='d-flex justify-content-between'>
                    <div className='font-weight-bold h3 text-black title'>
                        <FaClipboardList className='text-primary rounded titleIcon p-1' size={35} /> Teacher List
                    </div>
                    <div className='curser-pointer' style={{ cursor: "pointer" }}>
                        <Fab aria-label="add" size='small' style={{ backgroundColor: "#696cff", marginRight: "5px", zIndex: '1' }}>
                            <MdOutlineAddCircle style={{ color: "#fff" }} size={20} onClick={() => {
                                navigation.push("/SuperAdmin/Subject/Create")
                            }} />
                        </Fab>
                    </div>
                </div>

                <div className='tableContainer pb-3' id="card">
                    <table className="tableCus table-striped table table-hover ">
                        <thead>
                            <tr>
                                <th className="font-weight-bold" scope="col"
                                >
                                    ID
                                </th>
                                <th className="font-weight-bold" scope="col"
                                >
                                    Name
                                </th>
                                <th className="font-weight-bold" scope="col"
                                >
                                    Email
                                </th>
                                <th className="font-weight-bold" scope="col"
                                >
                                    UserName
                                </th>
                                <th className="font-weight-bold" scope="col"
                                >
                                    Role
                                </th>
                                <th className="font-weight-bold" >
                                    Deleted
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                result !== null && result.length > 0 ?
                                    (result.map((User) => (
                                        <tr key={User.employeeID}>
                                            <td data-th="Id : " scope="row">{User.id}</td>
                                            <td data-th="Name : ">{User.name}</td>
                                            <td data-th="Email  : ">{User.email}</td>
                                            <td data-th="UserName : ">{User.userName}</td>
                                            <td data-th="Role : ">
                                                <select class="custom-select" disabled value={User.roleID}>
                                                    <option value="1">Super Admin</option>
                                                    <option value="3">Admin</option>
                                                    <option value="4">Teacher</option>
                                                    <option value="6">Student</option>
                                                </select>
                                            </td>
                                            <td data-th="IsDeleted : ">
                                                <input
                                                    className={"react-switch-checkbox"}
                                                    id={`react-switch-new`}
                                                    type="checkbox"
                                                    checked={User.isDeleted}
                                                    size={5}
                                                    disabled={true}
                                                />
                                                <label
                                                    className={"ml-3 react-switch-label" + (!User.isDeleted ? " redC" : " blueC")}
                                                    htmlFor={`react-switch-new`}
                                                    size={5}
                                                >
                                                    <span size={5} className={`react-switch-button`} />
                                                </label>
                                            </td>
                                            <td>
                                                <Fab aria-label="add" size='small' style={{ backgroundColor: "#696cff", marginRight: "5px", }}>
                                                    <AiFillEye title='View' style={{ color: "#fff", cursor: 'pointer' }}
                                                        color='red' size={20} onClick={() => {
                                                            navigation.push("/SuperAdmin/Teacher/Details", User.id)
                                                        }} />
                                                </Fab>
                                                <Fab aria-label="add" size='small' style={{ backgroundColor: "#696cff", marginRight: "5px", }}>
                                                    <FaEdit title='Edit' style={{ color: "#fff", cursor: 'pointer' }}
                                                        size={20} onClick={() => {
                                                            navigation.push("/SuperAdmin/Teacher/Edit", User.id)
                                                        }} />

                                                </Fab>

                                            </td>
                                        </tr>)
                                    )
                                    ) : (
                                        <tr>
                                            <td colSpan={8} style={{ fontSize: "15px" }} className="p-2 font-weight-bold">No data found.</td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='row d-flex justify-content-between align-items-center font-weight-bold text-primary mb-5'>
                <div className='col-sm d-flex alignItemsCus'>
                    Total Records
                </div>
                <div className=" col-sm mt-3">
                </div>
                <div className='col-sm d-flex h-25 justify-content-end alignItemsCus'>
                </div>
            </div>
        </div >
        // </div >
    )
    //#endregion
}

export default TeacherList;

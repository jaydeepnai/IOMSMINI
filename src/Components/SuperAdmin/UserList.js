//#region imports
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserListDR from '../../DataRepository/User/UserList';
import { MdDeleteForever, MdOutlineAddCircle } from 'react-icons/md';
import { FaEdit, FaClipboardList } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import '../../Switch.css';
import UserDelete from '../../DataRepository/SuperAdmin/UserDelete';
import { Fab, IconButton } from '@mui/material';
import AlertDialog from '../Master/ConfirmBox';
import { ProgressContext } from '../../App';
import { useContext } from 'react';

//#endregion

function UserList({ Title }) {
    //#region variables
    const navigation = useHistory();
    const [ModelInfo, setModelInfo] = useState({
        Header: "Delete User?",
        Message: "Our system have soft delete functionallity, So you can get it back whenever you want. Are you sure, You Want to delete ",
        AgreeButton: "DELETE USER",
        CencelButton: "CENCEL"
    })
    const [IsOpen, setIsOpen] = useState(false)
    const [DeleteID, setDeleteID] = useState(false)
    const [result, setResult] = useState([])
    const { setProgress } = useContext(ProgressContext)
    //#endregion

    //#region functions
    const DeleteUser = async () => {
        setProgress(30)
        await UserDelete({ ID: DeleteID })
        setProgress(60)
        let index = result.findIndex((item) => item.id === DeleteID)
        if (index >= 0) {
            result.splice(index, 1);
            setResult([...result]);
        }
        setProgress(100)
    }
    const DeleteModel = (ID) => {
        setDeleteID(ID)
        setIsOpen(true);
    }
    const GetData = async () => {
        setProgress(30)
        var result = await UserListDR();
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
            <AlertDialog
                ModelInfo={ModelInfo}
                IsOpen={IsOpen} DeleteID={DeleteID}
                setIsOpen={setIsOpen}
                handleAgree={DeleteUser}
            />
            <div className='mtCustom '>
                <div className='d-flex justify-content-between'>
                    <div className='font-weight-bold h3 text-black title'>
                        <FaClipboardList className='text-primary rounded titleIcon p-1' size={35} /> User List
                    </div>
                    <div className='curser-pointer' style={{ cursor: "pointer" }} >
                        <Fab aria-label="add" size='small' style={{ backgroundColor: "#696cff", marginRight: "5px", zIndex: '1' }}>
                            <MdOutlineAddCircle style={{ color: "#fff" }} size={20} onClick={() => {
                                navigation.push("SuperAdmin/User/Create")
                            }} />
                        </Fab>
                    </div>
                </div>

                <div className='tableContainer pb-3' id="card">
                    <table className="tableCus table-striped table table-hover ">
                        <thead>
                            <tr>
                                <th className="font-weight-bold" scope="col">
                                    ID
                                </th>
                                <th className="font-weight-bold" scope="col">
                                    Name
                                </th>
                                <th className="font-weight-bold" scope="col">
                                    Email
                                </th>
                                <th className="font-weight-bold" scope="col">
                                    UserName
                                </th>
                                <th className="font-weight-bold" scope="col">
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
                                                    <AiFillEye title='View' color='red' size={20} onClick={() => {
                                                        navigation.push("SuperAdmin/User/Details", User.id)
                                                    }} style={{ color: "#fff", cursor: 'pointer' }} />
                                                </Fab>
                                                <Fab aria-label="add" size='small' style={{ backgroundColor: "#696cff", marginRight: "5px", }}>
                                                    <FaEdit title='Edit' style={{ color: "#fff", cursor: 'pointer' }}
                                                        size={20} onClick={() => {
                                                            navigation.push("SuperAdmin/User/Edit", User.id)
                                                        }} />
                                                </Fab>
                                                <Fab aria-label="add" size='small' style={{ backgroundColor: "#696cff", marginRight: "5px", }}>
                                                    <MdDeleteForever title='Delete' size={20} style={{ color: "#fff", cursor: 'pointer' }}
                                                        onClick={() => {
                                                            // deleteUser(User.id)
                                                            DeleteModel(User.id)
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

export default UserList;

//#region imports
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MdSkipPrevious, MdSkipNext, MdDeleteForever, MdOutlineAddCircle } from 'react-icons/md';
import { FaEdit, FaClipboardList } from 'react-icons/fa';
import { AiFillEye, AiFillUnlock, AiOutlineTrademarkCircle } from 'react-icons/ai';
import '../../Switch.css';
import SubjectListDR from '../../DataRepository/SuperAdmin/SubjectList';
import SubjectDelete from '../../DataRepository/SuperAdmin/SubjectDelete';
import { Fab } from '@mui/material';
import AlertDialog from '../Master/ConfirmBox';
import { ProgressContext } from '../../App';
import { useContext } from 'react';

//#endregion

function SubjectList({ Title }) {
    //#region variables
    const navigation = useHistory();
    const [ModelInfo, setModelInfo] = useState({
        Header: "Delete Subject?",
        Message: "Our system have soft delete functionallity, So you can get it back whenever you want. Are you sure, You Want to delete this subject",
        AgreeButton: "DELETE SUBJECT",
        CencelButton: "CENCEL"
    })
    const [IsOpen, setIsOpen] = useState(false)
    const { setProgress } = useContext(ProgressContext)
    const [DeleteID, setDeleteID] = useState(false)
    const [result, setResult] = useState([])
    //#endregion

    //#region functions
    const DeleteModel = (ID) => {
        setDeleteID(ID)
        setIsOpen(true);
    }
    const DeleteSubject = async (ID) => {
        setProgress(30)
        var response = await SubjectDelete({ ID: ID, navigation: navigation })
        setProgress(60)
        let index = result.findIndex((item) => item.id === ID)
        setProgress(90)
        if (index >= 0) {
            result.splice(index, 1);
            setResult([...result]);
        }
        setProgress(100)
    }
    const GetData = async () => {
        setProgress(30)
        var result = await SubjectListDR();
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
                handleAgree={DeleteSubject}
            />
            <div className='mtCustom '>
                <div className='d-flex justify-content-between'>
                    <div className='font-weight-bold h3 text-black title'>
                        <FaClipboardList className='text-primary rounded titleIcon p-1' size={35} /> Subject List
                    </div>
                    <div className='curser-pointer' style={{ cursor: "pointer" }}>
                        <Fab aria-label="add" size='small' style={{ backgroundColor: "#696cff", marginRight: "5px", zIndex: '1' }}>
                            <MdOutlineAddCircle style={{ color: "#fff" }} size={20} onClick={() => {
                                navigation.push("/SuperAdmin/Subject/Create")
                            }} /></Fab>
                    </div>
                </div>

                <div className='tableContainer pb-3' id="card">
                    <table className="tableCus table-striped table table-hover ">
                        <thead>
                            <tr>
                                <th className="font-weight-bold" scope="col">ID</th>
                                <th className="font-weight-bold" scope="col">Name</th>
                                <th className="font-weight-bold" scope="col">Description</th>
                                <th className="font-weight-bold" scope="col">IsDeleted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                result && result.length > 0 ?
                                    (result.map((Subject) => (
                                        <tr key={Subject.id}>
                                            <td data-th="Id : " scope="row">{Subject.id}</td>
                                            <td data-th="Name : ">{Subject.name}</td>
                                            <td data-th="Email  : ">{Subject.description}</td>
                                            <td data-th="IsDeleted : ">
                                                <input className={"react-switch-checkbox"} id={`react-switch-new`} type="checkbox" checked={Subject.isDeleted} size={5} disabled={true}
                                                />
                                                <label
                                                    className={"ml-3 react-switch-label" + (!Subject.isDeleted ? " redC" : " blueC")}
                                                    htmlFor={`react-switch-new`} size={5}>
                                                    <span size={5} className={`react-switch-button`} />
                                                </label>
                                            </td>
                                            <td>
                                                <Fab aria-label="add" size='small' style={{ backgroundColor: "#696cff", marginRight: "5px", }}>
                                                    <AiFillEye size={20} title='View' style={{ color: "#fff", cursor: 'pointer' }}
                                                        color='red' onClick={() => { navigation.push("Subject/Details", Subject.id) }} />

                                                </Fab>
                                                <Fab aria-label="add" size='small' style={{ backgroundColor: "#696cff", marginRight: "5px", }}>
                                                    <FaEdit title='Edit' style={{ color: "#fff", cursor: 'pointer' }} size={20} onClick={() => { navigation.push("Subject/Edit", Subject.id) }} />
                                                </Fab>
                                                <Fab aria-label="add" size='small' style={{ backgroundColor: "#696cff", marginRight: "5px", }}>
                                                    <MdDeleteForever title='Delete' size={20} style={{ color: "#fff", cursor: 'pointer' }}
                                                        onClick={() => { DeleteModel(Subject.id) }} />
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
                    {/* {MainStateObj.totalRecords} */}
                </div>
            </div>
        </div >
        // </div >
    )
    //#endregion
}

export default SubjectList;

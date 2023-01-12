import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MdOutlineAddCircle } from 'react-icons/md';
import { FaClipboardList } from 'react-icons/fa';
import '../../Switch.css';
import TeacherSubjectDetail from '../../DataRepository/SuperAdmin/GetTeacherSubject';
import RecipeReviewCard from './SubjectCard';
import UnSubscribeSubject from '../../DataRepository/Teacher/UnSubscribeSubject';
import AlertDialog from '../Master/ConfirmBox';
import { ProgressContext } from '../../App';
import { useContext } from 'react';
import NotFound from '../../Common/NotFound';

function TeacherSubjectList() {
    const [result, setResult] = useState([])
    const [IsOpen, setIsOpen] = useState(false)
    const [DeleteID, setDeleteID] = useState(false)
    const { setProgress } = useContext(ProgressContext)
    const [ModelInfo, setModelInfo] = useState({
        Header: "UnSubscribe Subject ?",
        Message: "Admin Selected You For This Subject, Are You Sure? You Want To UnSubscribe Subject?",
        AgreeButton: "UNSUBSCRIBE",
        CencelButton: "CENCEL"
    })
    const DeleteModel = (ID) => {
        setDeleteID(ID)
        setIsOpen(true);
    }
    const DeleteSubject = async (ID) => {
        setProgress(30)
        var id = JSON.parse(localStorage.getItem("userModel")).user.id;
        var response = await UnSubscribeSubject({ SubjectID: ID, UserID: id })
        setProgress(60)
        let index = result.findIndex((item) => item.id === ID)
        if (index >= 0) {
            result.splice(index, 1);
            setResult([...result]);
        }
        setProgress(100)
    }
    const GetData = async () => {
        setProgress(30)
        var id = JSON.parse(localStorage.getItem("userModel")).user.id;
        var result = await TeacherSubjectDetail(id);
        setProgress(60)
        setResult(result);
        setProgress(100)
    };
    useEffect(() => {
        GetData();
    }, []);

    return (
        // <div className="">
        <div className='content-wrapper'>
            <AlertDialog
                ModelInfo={ModelInfo}
                IsOpen={IsOpen} DeleteID={DeleteID}
                setIsOpen={setIsOpen} handleAgree={DeleteSubject} />
            <div className='mtCustom '>
                <div className='d-flex justify-content-between'>
                    <div className='font-weight-bold h3 text-black title'>
                        <FaClipboardList className='text-primary rounded titleIcon p-1' size={35} /> Subject List
                    </div>
                </div>
                {
                    result && result.length > 0 ?
                        <div className='row'>
                            {
                                result.map((s) => (
                                    <div className='col-4 mb-4'>
                                        <RecipeReviewCard data={s} DeleFun={DeleteModel} />
                                    </div>
                                ))
                            }
                        </div>
                        : <NotFound Content="Please contact admin to assign subjects to you" />
                }
            </div>
        </div >
        // </div >
    )
}

export default TeacherSubjectList
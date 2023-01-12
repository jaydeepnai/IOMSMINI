//#region imports
import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import FileUpload from '../../DataRepository/Teacher/FileUpload';
import GetSubjectFiles from '../../DataRepository/Teacher/GetSubjectFiles';
import FileDataCard from '../Teacher/FileCard';
import FileDelete from '../../DataRepository/Teacher/DeleteFile';
import AlertDialog from '../Master/ConfirmBox';
import { ProgressContext } from '../../App';
import NotFound from '../../Common/NotFound';
//#endregion

function SubjectBLL({ UID }) {
    //#region variables
    const { setProgress } = useContext(ProgressContext)
    const history = useHistory();
    const [imageUrls, setImageUrls] = useState([]);
    const [IsOpen, setIsOpen] = useState(false)
    const [DeleteID, setDeleteID] = useState(false)
    //#endregion


    //#region function
    const DeleteModel = (ID) => {
        setDeleteID(ID)
        setIsOpen(true);
    }
    const getDetails = async () => {
        setProgress(30)
        var result = await GetSubjectFiles(UID)
        setImageUrls(result)
        setProgress(100)
    }
    useEffect(() => {
        getDetails();
    }, [])

    //#endregion 
    //#region html
    return (
        <>
            <div className="content-wrapper ">
                <h4 className="d-flex font-weight-bold h3 text-black title">
                    &nbsp;&nbsp;Subject Content
                </h4>
                <div className="forms-sample card-body">
                    <div className=" align-center">

                        {imageUrls && imageUrls?.length !== 0 ?
                            <div className="form-row">
                                {imageUrls?.map((i) => {
                                    return <div className='col-4 mb-4'>
                                        <FileDataCard showIt={false} data={i} DeleFun={DeleteModel} />
                                    </div>
                                })}
                            </div> :
                            <NotFound ShowButton={true} Content="Please contact admin to add Content in subject" />

                        }
                        {
                            imageUrls.length !== 0 && <div className='row col-4 mb-4'>
                                <Button variant="contained" className="btn btn-primary" size='large'
                                    onClick={() => {
                                        history.push("/student/")
                                    }}
                                >Cancel</Button>
                            </div>
                        }
                    </div>
                </div>
            </div></>
    )
}
//#endregion

export default SubjectBLL
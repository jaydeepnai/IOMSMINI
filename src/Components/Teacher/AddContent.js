//#region imports
import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import FileUpload from '../../DataRepository/Teacher/FileUpload';
import GetSubjectFiles from '../../DataRepository/Teacher/GetSubjectFiles';
import FileDataCard from './FileCard';
import { DragDropFile } from './DragDrop';
import FileDelete from '../../DataRepository/Teacher/DeleteFile';
import AlertDialog from '../Master/ConfirmBox';
import { ProgressContext } from '../../App';
import NotFound from '../../Common/NotFound';
//#endregion

function AddContentBLL({ UID }) {
    //#region variables
    const [FileName, setFileName] = useState('');
    const { setProgress } = useContext(ProgressContext)
    const history = useHistory();
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [IsOpen, setIsOpen] = useState(false)
    const [DeleteID, setDeleteID] = useState(false)
    const [ModelInfo, setModelInfo] = useState({
        Header: "Delete File ?",
        Message: "Are You Sure? You Want To UnSubscribe Subject?",
        AgreeButton: "delete file",
        CencelButton: "CENCEL"
    })
    //#endregion


    //#region function
    const DeleteModel = (ID) => {
        setDeleteID(ID)
        setIsOpen(true);
    }
    const DeleteFile = async (ID) => {
        setProgress(30)
        var response = await FileDelete(ID)
        let index = imageUrls.findIndex((item) => item.id === ID)
        if (index >= 0) {
            imageUrls.splice(index, 1);
            setImageUrls([...imageUrls]);
        }
        setProgress(100)
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
    const EditUser = async (e) => {
        setProgress(30)
        e.preventDefault();
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${FileName}`,);
        setProgress(60)
        var type = FileName.includes(".png") || FileName.includes(".jpeg") || FileName.includes(".jpg") ? "Image" : "Docs";
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            setProgress(90)
            getDownloadURL(snapshot.ref).then(async (url) => {
                var name = JSON.parse(localStorage.getItem("userModel")).user.name
                var FileUploadObj = {
                    id: 0,
                    subjectID: UID,
                    teacherName: name,
                    fileURL: url,
                    fileName: FileName,
                    type: type,
                }
                var result = await FileUpload(FileUploadObj)
                getDetails()
                setImageUpload(null)
            });
        });
        setProgress(100)
    };

    //#endregion 
    //#region html
    return (
        <>
            <div className="content-wrapper" style={{ paddingBottom: "0rem" }}>
                <AlertDialog
                    ModelInfo={ModelInfo}
                    IsOpen={IsOpen} DeleteID={DeleteID}
                    setIsOpen={setIsOpen} handleAgree={DeleteFile} />
                <><h4 className="d-flex font-weight-bold h3 text-black title">
                    &nbsp;&nbsp;Add Content
                </h4>
                    <div className="align-center">
                        <div className="form-row">
                        </div>
                        <div className="form-row">
                            <div className="m-4">
                                <DragDropFile FileName={FileName} setFileName={setFileName} setImageUpload={setImageUpload} />
                                <div className="row d-flex col-sm cusMediaPad">
                                    <Button variant="contained"
                                        onClick={EditUser} className="btn mt-4 btn-primary btnCusPad ml-2" >Upload To Subeject</Button>
                                    <Button variant="contained" className="btn mt-4 btn-primary btnCusPad ml-2" size='large'
                                        onClick={() => {
                                            history.push("/teacher/")
                                        }}
                                    >Cancel</Button>
                                </div>
                            </div>
                        </div>
                    </div></>
            </div >
            <div className="content-wrapper ">
                <h4 className="d-flex font-weight-bold h3 text-black title">
                    &nbsp;&nbsp;Subject Content
                </h4>
                <div className="forms-sample card-body">
                    <div className=" align-center">
                        {
                            imageUrls && imageUrls.length > 0 ?
                                <div className="form-row">
                                    {imageUrls.map((i) => {
                                        return <div className='col-4 mb-4'>
                                            <FileDataCard showIt={true} data={i} DeleFun={DeleteModel} />
                                        </div>
                                    })}
                                </div> :
                                <NotFound Content="Please upload some files for student" />
                        }
                    </div>
                </div>
            </div></>
    )
}
//#endregion

export default AddContentBLL
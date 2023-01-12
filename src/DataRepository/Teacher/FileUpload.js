import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateUrl } from '../../Common/Helper';
import { UploadFile } from '../API Constant/API';
export default async function FileUpload({ id, subjectID, teacherName, fileURL, fileName, type }) {
    var parameters =
        { "id": id, "SubjectID": subjectID, "TeacherName": teacherName, "FileURL": fileURL, "FileName": fileName, "Type": type, }
    var url = CreateUrl(UploadFile)
    var result;
    await axios.post(url, parameters).then((data) => {
        result = data.data;
        toast.info("File Uploaded Successfully !", {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }).catch((err) => {
        toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    })
    return result;
}

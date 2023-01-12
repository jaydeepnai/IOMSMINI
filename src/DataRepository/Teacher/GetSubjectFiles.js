import axios from 'axios';
import { toast } from 'react-toastify';
import { GetUploadFiles } from '../API Constant/API';

export default async function GetSubjectFiles(id) {
    var url = process.env.REACT_APP_BaseAddress + GetUploadFiles + "/" + id;
    var result;
    await axios.get(url).then((data) => {
        result = data.data;
    }).catch((err) => {
        toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    })
    return result;
}   
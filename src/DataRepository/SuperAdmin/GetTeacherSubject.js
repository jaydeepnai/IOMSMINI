import axios from 'axios';
import { toast } from 'react-toastify';
import { get_Teacher } from '../API Constant/API';

export default async function TeacherSubjectDetail(UID) {
    var url = process.env.REACT_APP_BaseAddress + get_Teacher + "/" + UID;
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
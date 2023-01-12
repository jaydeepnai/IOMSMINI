import axios from 'axios';
import { toast } from 'react-toastify';
import { SUBJECT_DELETE } from '../API Constant/API';
export default async function SubjectDelete({ ID }) {
    var url = process.env.REACT_APP_BaseAddress + SUBJECT_DELETE + "/" + ID;
    var result;
    await axios.delete(url).then((data) => {
        result = data.data;
        toast.success("Subject Deleted Successfully !", {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }).catch((err) => {
        toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    })
    return result;
}

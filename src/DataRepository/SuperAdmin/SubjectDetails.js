import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateUrl, GetToken, responseAction } from '../../Common/Helper';
import { SUBJECT_GET } from '../API Constant/API';

export default async function SubjectDetail({ id }) {
    var url = process.env.REACT_APP_BaseAddress + SUBJECT_GET + "/" + id;
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
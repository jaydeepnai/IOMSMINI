import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateUrl, GetToken, responseAction } from '../../Common/Helper';
import { USER_DETAILS } from '../API Constant/API';

export default async function UserDetail({ id }) {
    var url = process.env.REACT_APP_BaseAddress + USER_DETAILS + "/" + id;
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
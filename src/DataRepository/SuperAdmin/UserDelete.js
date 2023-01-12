import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateUrl } from '../../Common/Helper';
import { USER_DELETE } from '../API Constant/API';
export default async function UserDelete({ ID }) {
    var url = process.env.REACT_APP_BaseAddress + USER_DELETE + "/" + ID;
    var result;
    await axios.delete(url).then((data) => {
        result = data.data;
        toast.success("User Deleted Successfully !", {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }).catch((err) => {
        toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    })
    return result;
}

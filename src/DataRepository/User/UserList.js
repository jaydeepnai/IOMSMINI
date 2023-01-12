import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateUrl, GetToken, responseAction } from '../../Common/Helper';
import { USER_LIST } from '../API Constant/API';


export default async function UserListDR() {
    var url = CreateUrl(USER_LIST)
    var res;
    await axios.get(url).then((data) => {
        res = data.data;
    }).catch((err) => {
        toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    })
    return res;
}

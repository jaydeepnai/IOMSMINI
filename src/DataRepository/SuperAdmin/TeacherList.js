import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateUrl, GetToken, responseAction } from '../../Common/Helper';
import { get_Teachers } from '../API Constant/API';


export default async function TeacherListDR() {
    var url = CreateUrl(get_Teachers)
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

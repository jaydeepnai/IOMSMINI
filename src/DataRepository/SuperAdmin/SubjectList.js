import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateUrl, GetToken, responseAction } from '../../Common/Helper';
import { SUBJECT_GET_ALL } from '../API Constant/API';


export default async function SubjectListDR() {
    var url = CreateUrl(SUBJECT_GET_ALL)
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

import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateUrl, } from '../../Common/Helper';
import { update_Teacher } from '../API Constant/API';
export default async function UserSubjectEdit({ id, subejects }) {
    var parameters =
    {
        userID: id,
        subjectIds: subejects
    }
    var url = CreateUrl(update_Teacher)
    var result;
    await axios.post(url, parameters).then((data) => {
        result = data.data;
        toast.success("Teacher Subject-list Successfully !", {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }).catch((err) => {
        toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    })
    return result;
}

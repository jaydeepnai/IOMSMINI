import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateUrl, GetToken, responseAction } from '../../Common/Helper';
import { SUBJECT_CREATE } from '../API Constant/API';
export default async function SubjectCreate(Subject) {
    var parameters =
    {
        Name: Subject.name,
        Description: Subject.description,
    }
    var url = CreateUrl(SUBJECT_CREATE)
    var result;
    await axios.post(url, parameters).then((data) => {
        result = data.data;
        toast.success("Subject Created Successfully !", {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }).catch((err) => {
        toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    })
    return result;
}

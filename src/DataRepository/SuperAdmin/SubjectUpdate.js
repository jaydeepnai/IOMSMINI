import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateUrl } from '../../Common/Helper';
import { SUBJECT_UPDATE } from '../API Constant/API';
export default async function SubjectEdit({ id, name, description, isDeleted }) {
    var parameters =
    {
        id: id,
        name: name,
        description: description,
        isDeleted: isDeleted
    }
    var url = CreateUrl(SUBJECT_UPDATE)
    var result;
    await axios.post(url, parameters).then((data) => {
        result = data.data;
        toast.info("Subject Edited Successfully !", {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }).catch((err) => {
        toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    })
    return result;
}

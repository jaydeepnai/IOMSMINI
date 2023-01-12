import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateUrl } from '../../Common/Helper';
import { DeleteTeacherSubject } from '../API Constant/API';
export default async function UnSubscribeSubject({ UserID, SubjectID }) {
    var PerameterList = {
        subjectID: SubjectID,
        userID: UserID
    }
    var url = CreateUrl(DeleteTeacherSubject)
    var result;
    await axios.post(url, PerameterList).then((data) => {
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

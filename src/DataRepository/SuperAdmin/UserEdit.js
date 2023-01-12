import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateUrl, GetToken, responseAction } from '../../Common/Helper';
import { USER_EDIT } from '../API Constant/API';
export default async function UserEdit({ id, name, userName, email, password, roleID, }) {
    var parameters = { id: id, name: name, userName: userName, email: email, password: password, roleID: roleID, isDeleted: false }
    var url = CreateUrl(USER_EDIT)
    var result;
    await axios.post(url, parameters).then((data) => {
        result = data.data;
        toast.info("User Edited Successfully !", {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }).catch((err) => {
        toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    })
    return result;
}

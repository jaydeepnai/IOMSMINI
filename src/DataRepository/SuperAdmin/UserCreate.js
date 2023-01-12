import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateUrl, GetToken, responseAction } from '../../Common/Helper';
import { USER_CREATE } from '../API Constant/API';
export default async function UserCreate(User) {
    var parameters =
    {
        Name: User.name,
        UserName: User.userName,
        Email: User.email,
        Password: User.password,
        RoleID: User.roleID,
    }
    var url = CreateUrl(USER_CREATE)
    var result;
    await axios.post(url, parameters).then((data) => {
        result = data.data;
        toast.success("User Created Successfully !", {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }).catch((err) => {
        toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    })
    return result;
}

import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateUrl, GetToken } from '../../Common/Helper';
import { USER_AUTHENTICATION } from '../API Constant/API';
export default async function Login(loginInfo) {
  const config = {
    headers: {}
  };
  var parameters =
  {
    "Email": loginInfo.Email,
    "Password": loginInfo.Password
  }
  var url = CreateUrl(USER_AUTHENTICATION)
  var result;
  await axios.post(url, parameters, config).then((data) => {
    result = data.data;
    toast.success("Logged In Successfully", {
      position: toast.POSITION.BOTTOM_RIGHT,
    })
  }).catch((err) => {
    toast.error(err.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    })
  })
  return result;
}

import axios from 'axios'
import { toast } from 'react-toastify';
import { CreateUrl, GetToken, responseAction } from '../../Common/Helper';
import { ROLE_API } from '../API Constant/API';

async function Roles(id) {
    var result;
    var url = process.env.REACT_APP_BaseAddress + ROLE_API + "/" + id;
    await axios.get(url).then((response) => {
        result = response.data
    }).catch((err) => {
        toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    })
    return result;
}

export default Roles
import axios from 'axios';
import { toast } from 'react-toastify';
import { DeleteFile } from '../API Constant/API';
export default async function FileDelete(ID) {
    var url = process.env.REACT_APP_BaseAddress + DeleteFile + "/" + ID;
    var result;
    await axios.delete(url).then((data) => {
        result = data.data;
        toast.success("File Deleted Successfully !", {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }).catch((err) => {
        toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    })
    return result;
}

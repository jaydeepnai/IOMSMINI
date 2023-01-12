import axios from 'axios'
import React from 'react'
import { CreateUrl, GetToken, responseAction } from '../../Common/Helper';

async function UserDetail({ navigation }) {
    var result;
    const config = {
        headers: {
            Authorization: GetToken(),
        }
    };
    return result;
}

export default UserDetail

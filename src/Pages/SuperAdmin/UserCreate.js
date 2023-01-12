import React, { useState } from 'react'
import UserCreateBLL from '../../Components/SuperAdmin/UserCreate';

function UserCreate() {
    const [title, setTitle] = useState("")

    return (
        <div>
            <UserCreateBLL Title={title} />
        </div>
    )
}

export default UserCreate

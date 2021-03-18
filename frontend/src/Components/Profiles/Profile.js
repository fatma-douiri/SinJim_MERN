import React from 'react'
import AdminProfile from'./AdminProfile'
import UserProfile from './UserProfile'
import { useSelector } from 'react-redux'

const Profile = () => {

    const user = useSelector((state) => state.userReducer.user);
    console.log(user.role)

    return user.role === 0 ? <AdminProfile/> : < UserProfile/>
       
}

export default Profile

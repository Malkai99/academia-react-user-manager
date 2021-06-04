import React from 'react'
import { useUsersList } from '../hooks/useUsersList'
import UserContext from '../context/userContext'

const UsersProvider = ({ children }:any ) => {
    const initialValue = useUsersList()
    return (
        <UserContext.Provider value={initialValue}>
            {children}
        </UserContext.Provider>
    )
}

export default UsersProvider
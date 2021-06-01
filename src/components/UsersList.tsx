import React, { useEffect, useState, useContext } from 'react'
import User from './User';
import UserContext from '../context/userContext'
interface IProps{
    modifyUserList: any;
}

const UsersList = ({ modifyUserList }:IProps) => {

    const { usersList  }:any = useContext(UserContext);

    useEffect(() => {
        console.log('useeffect ', usersList);
        // refreshUsersList(usersList);
        // setUserRefresh(true);
    }, [usersList])

    function getUserList():any{
        console.log('ejecuta getuserslist')
        return(
            usersList.map( (user:any) => {
                return <User key={user.id} userInfo={user} usersList={usersList} modifyUserList={modifyUserList} />
            })  
            );
    }
    console.log('user list ', usersList)

    return (

        <div className="users-list">
            {
               usersList && getUserList()
            }
        </div>
    )
}

export default UsersList
import React, { useEffect, useState, useContext } from 'react'
import { Button, Paper, Avatar, Tooltip, IconButton } from '@material-ui/core';
import { Delete, Close, Done } from '@material-ui/icons';
import User from './User';
import UserContext from '../context/userContext'
interface IProps{
    modifyUserList: any;
}

const UsersList = ({ modifyUserList }:IProps) => {

    const { usersData  }:any = useContext(UserContext);

    useEffect(() => {
        console.log('useeffect ', usersData);
        // refreshUsersList(usersList);
        // setUserRefresh(true);
    }, [usersData])

    function getUserList():any{
        return(
            usersData.map( (user:any) => {
                return <User key={user.id} userInfo={user} usersList={usersData} modifyUserList={modifyUserList} />
            })  
        );
    }

    return (

        <div className="users-list">
            {
               usersData && getUserList()
            }
        </div>
    )
}

export default UsersList
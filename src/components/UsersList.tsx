import React, { useEffect, useState } from 'react'
import { Button, Paper, Avatar, Tooltip, IconButton } from '@material-ui/core';
import { Delete, Close, Done } from '@material-ui/icons';
import User from './User';

interface IProps{
    usersList: Array<any>;
    modifyUserList: any;
}

const UsersList = ({ usersList, modifyUserList }:IProps) => {
    const [userRefresh, setUserRefresh] = useState(false);

    useEffect(() => {
        console.log('useeffect ', usersList);
        // refreshUsersList(usersList);
        // setUserRefresh(true);
    }, [usersList])

    function getUserList():any{
        return(
            usersList.map( (user:any) => {
                return <User key={user.id} userInfo={user} usersList={usersList} modifyUserList={modifyUserList} />
            })  
        );
    }

    return (

        <div className="users-list">
            {
               usersList && getUserList()
            }
        </div>
    )
}

export default UsersList
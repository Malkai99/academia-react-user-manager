import { useEffect, useState, useContext } from 'react'
import { Button, Paper, Avatar, Tooltip, IconButton } from '@material-ui/core';
import { Delete, Close, Done } from '@material-ui/icons';
import { useUsersList } from '../hooks/useUsersList'
import UserContext from '../context/userContext'

interface IProps{
    userInfo: any;
    usersList: any;
    modifyUserList: any;
}

const User = ({ userInfo, usersList, modifyUserList }: IProps) => {
    const { usersData, deleteUser, modifyUserState  }:any = useContext(UserContext);

    function handleDelete(id:any) {
        deleteUser(id);
        modifyUserList(usersList.filter((user:any) => user.id !== id))
    }

    function handleActive(isActive: boolean, id:any){
        modifyUserState(id,isActive);
        modifyUserList(
            usersList.map( (user:any) => {
                return user.id == id ? {...user, active: isActive} : user;
            })
        )
    }

    return (
        <>
            <Paper className="user-row" elevation={3}>
                <div className="left-side">
                    <div className={`avatar__container ${userInfo.active ? 'is_active' : ''}`} >
                        <Avatar src={userInfo.avatar} />
                    </div>
                    <div className="user-name-container">
                        <span className="user-name">{userInfo.name}</span>
                        <span className="user-lastname">{userInfo.lastname}</span>
                        <span className="user-email">{userInfo.email}</span>
                    </div>
                </div>
                <div className="right-side">
                    <div className={`active__container ${!userInfo.active ? 'hidden' : ''}`}>
                        <Tooltip title="desactivar">
                        <IconButton onClick={() => handleActive(false,userInfo.id)}>
                            <Close></Close>
                        </IconButton>
                        </Tooltip>
                    </div>
                    <div className={`active__container ${userInfo.active ? 'hidden' : '' }`}>
                        <Tooltip title="activar">
                        <IconButton onClick={() => handleActive(true,userInfo.id)}>
                            <Done></Done>
                        </IconButton>
                        </Tooltip>
                    </div>
                    <Tooltip title="eliminar">
                    <IconButton onClick={() => handleDelete(userInfo.id)}>
                        <Delete></Delete>
                    </IconButton>
                    </Tooltip>
                </div>
            </Paper>  
        </>
    )
}

export default User

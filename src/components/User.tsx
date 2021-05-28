import React, { useEffect } from 'react'
import { Button, Paper, Avatar, Tooltip, IconButton } from '@material-ui/core';
import { Delete, Close, Done } from '@material-ui/icons';

interface IProps{
    userInfo: any;
    usersList: any;
    modifyUserList: any;
}

const User = ({ userInfo, usersList, modifyUserList }: IProps) => {

    function handleDelete() {
        modifyUserList([...usersList, usersList.splice()])
        console.log('delete ')
    }

    return (
        <>
            <Paper className="user-row" elevation={3}>
                <div className="left-side">
                    <Avatar src={userInfo.avatar} />
                    <div className="user-name-container">
                        <span className="user-name">{userInfo.name}</span>
                        <span className="user-lastname">{userInfo.lastname}</span>
                        <span className="user-email">{userInfo.email}</span>
                    </div>
                </div>
                <div className="right-side">
                    <Tooltip title="desactivar">
                    <IconButton>
                        <Close></Close>
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="activar">
                    <IconButton>
                        <Done></Done>
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="eliminar">
                    <IconButton onClick={() => console.log('detele')}>
                        <Delete></Delete>
                    </IconButton>
                    </Tooltip>
                </div>
            </Paper>  
        </>
    )
}

export default User

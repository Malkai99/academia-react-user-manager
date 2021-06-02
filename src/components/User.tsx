import { useContext } from 'react'
import { Paper, Avatar, Tooltip, IconButton } from '@material-ui/core';
import { Delete, Close, Done } from '@material-ui/icons';
import UserContext from '../context/userContext'

interface IProps{
    userInfo: any;
}

const User = ({ userInfo }: IProps) => {
    const { deleteUser, modifyUserState  }:any = useContext(UserContext);

    function handleDelete(id:any) {
        deleteUser(id);
    }

    function handleActive(isActive: boolean, user:any){
        modifyUserState(user,isActive);
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
                        <IconButton onClick={() => handleActive(false,userInfo)}>
                            <Close></Close>
                        </IconButton>
                        </Tooltip>
                    </div>
                    <div className={`active__container ${userInfo.active ? 'hidden' : '' }`}>
                        <Tooltip title="activar">
                        <IconButton onClick={() => handleActive(true,userInfo)}>
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

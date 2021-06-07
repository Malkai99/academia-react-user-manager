import { useContext, useEffect, useState } from 'react'
import User from './User';
import UserContext from '../context/userContext'
import paginationContext from '../context/paginationContext';

const UsersList = () => {

    const { usersList, usersBlocks  }:any = useContext(UserContext);
    const { page, getBlockUsers  }:any = useContext(paginationContext);
    const [blockUsers, setBlockUsers] = useState(getBlockUsers(usersList));

    useEffect(() => {
        if(blockUsers.length > 0) return
        setBlockUsers(getBlockUsers(usersList))
    }, [usersList]);

    useEffect(() => {
        setBlockUsers(getBlockUsers(usersBlocks))
    }, [page]);

    useEffect(() => {
        setBlockUsers(getBlockUsers(usersBlocks));
    }, [usersBlocks]);

    function getUserList():any{
        return(
            blockUsers.map( (user:any) => {
                return <User key={user.id} userInfo={user} />
            })  
        );
    }

    return (

        <div className="users-list">
            {
               blockUsers && getUserList()
            }
        </div>
    )
}

export default UsersList
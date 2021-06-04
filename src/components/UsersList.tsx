import { useContext } from 'react'
import User from './User';
import UserContext from '../context/userContext'

const UsersList = () => {

    const { usersList  }:any = useContext(UserContext);

    function getUserList():any{
        return(
            usersList.map( (user:any) => {
                return <User key={user.id} userInfo={user} />
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
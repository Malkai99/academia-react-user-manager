import { AddToQueueSharp } from '@material-ui/icons';
import { useState, useEffect} from 'react'
import UsersList from '../components/UsersList';
import userContext from '../context/userContext';

export const useUsersList = () => {
    const [usersData, setUserList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/users")
           .then( res => res.json())
           .then(
               (result) => {
                   setUserList(result)
               },
               (error) => {
                   setError(error)
               }
           )
    }, []);

    function addUser(user:any){
        fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        setUserList(user)
    }

    function deleteUser(id:number){
        fetch(`http://localhost:3001/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
    }

    function modifyUserState(id:number, isActive: boolean){
        let user = usersData.filter((user:any) => {
            if(user.id == id){
                user.active = isActive
                return user
            }
        })
        fetch(`http://localhost:3001/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user[0])
        })
    }

    return { usersData, addUser, deleteUser, modifyUserState};
}

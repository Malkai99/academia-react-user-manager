import { AddToQueueSharp } from '@material-ui/icons';
import { useState, useEffect} from 'react'
import UsersList from '../components/UsersList';

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
        console.log('este es el fetch ', user)
        fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
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
        fetch(`http://localhost:3001/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({active: isActive})
        })
    }

    return { usersData, addUser, deleteUser, modifyUserState};
}

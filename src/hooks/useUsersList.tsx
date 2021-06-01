import { AddToQueueSharp } from '@material-ui/icons';
import { useState, useEffect} from 'react'
import UsersList from '../components/UsersList';

export const useUsersList = () => {
    const [usersData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const urlToFetch = "http://localhost:3001/users"

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            fetch(urlToFetch)
               .then( res => res.json())
               .then(
                   (result) => {
                       setUserData(result)
                       setIsLoading(false)
                   },
                   (error) => {
                       setError(error)
                   }
               )

        }
        fetchData()
    }, []);

    useEffect(() => {
        console.log('se movio user data ', usersData)
    }, [usersData]);

    function addUser(user:any){
        fetch(urlToFetch, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(
            (result) => {
                setUserData([...usersData, user])
            },
            (error) => {
                setError(error)
            }

        )
    }

    function deleteUser(id:number){
        fetch(`${urlToFetch}/${id}`, {
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
        fetch(`${urlToFetch}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user[0])
        })
    }

    return { usersData, addUser, deleteUser, modifyUserState};
}

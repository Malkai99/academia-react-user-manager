import { useState, useEffect} from 'react'

interface User {
    id: number,
    active: boolean,
    avatar: string,
    name: string,
    lastname: string,
    email: string,
  
}

export const useUsersList = () => {
    const [usersList, setUserData] = useState<User[]>([]);
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
        console.log('se movio user data ', usersList)
    }, [usersList]);

    function addUser(user:User){
        fetch(urlToFetch, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(
            (result) => {
                setUserData([...usersList, user])
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
        let user = usersList.filter((user:any) => {
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

    return { usersList, addUser, deleteUser, modifyUserState};
}

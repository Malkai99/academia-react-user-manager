import { useState, useEffect} from 'react'
import { User } from '../types/user.interface'

export const useUsersList = () => {
    const [usersList, setUserData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const urlToFetch = "http://localhost:3001/users"


    useEffect(() => {
        const fetchData = () => {
            setIsLoading(true);
            fetch(urlToFetch)
               .then(checkFetch)
               .then( res => res.json())
               .then(
                   (result) => {
                       setUserData(result)
                       setIsLoading(false)
                   },
                   (error) => {
                       console.log('Error', error)
                       setError(error)
                   }
               )
        }
        fetchData()
    }, []);

    // useEffect(() => {
    //     // console.log('se movio user data ', usersList)
    // }, [usersList]);

    // useEffect(() => {
    //     console.log('error inside de catch ', error)
    // }, [error]);
    
    function checkFetch(response:any) {
        if (response.status >= 200 && response.status <= 299) {
            return response;
        } else {
            let error = `${response.statusText} ${response.status}`
            throw Error(error);
        }
    }

    function addUser(user:User){
        fetch(urlToFetch, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(checkFetch)
        .then(
            () => {
                setUserData([...usersList, user])
            }
        )
        .catch(
            (error) => {
                 console.log('error ', error)
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
        .then(checkFetch)
        .then(
            () => {
                setUserData(usersList.filter((user:any) => user.id !== id))
            }
        )
        .catch(
            (error) => {
                 console.log('error ', error)
                 setError(error)
            }
        )
    }

    function modifyUserState(user:User, isActive: boolean){
        let updateUser = {...user, active: isActive}
        fetch(`${urlToFetch}/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateUser)
        })
        .then(checkFetch)
        .then(res => res.json())
        .then(
            (result) => {
                const users = usersList.map( (user:any) => {
                    if(user.id === result.id){
                        user.active = isActive;
                    }
                    return user;
                })
                setUserData(users)
            }
        )
        .catch(
            (error) => {
                 console.log('error ', error)
                 setError(error)
            }
        )

    }

    function getSingleUser(id:number){
        return fetch(`${urlToFetch}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(checkFetch)
        .then( res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                console.log('Error', error)
                setError(error)
            }
        )
    }

    return { usersList, error, isLoading, addUser, deleteUser, modifyUserState, getSingleUser};
}

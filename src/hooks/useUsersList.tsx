import { useState, useEffect} from 'react'
import { User } from '../types/user.interface'

export const useUsersList = () => {
    const status:any = {
        ['all']: 'all',
        ['online']: true,
        ['offline']: false
    }
    const [usersList, setUserData] = useState<User[]>([]);
    const [usersBlocks, setUsersBlocks] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState(status['all'])
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
                       setUsersBlocks(result)
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

    useEffect(() => {
        // console.log('se movio user data ', usersList)
    }, [usersBlocks]);

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

    function filterBySearch(value:string) {
        console.log('fitler status ', filterStatus)
        let users = filterStatus === 'all' ? usersList : usersList.filter( (user:any) => (user.active == filterStatus));
        if(value !== ''){
            users = users.filter( (user:any) => (user.name.toLowerCase().indexOf(value) != -1) || (user.lastname.toLowerCase().indexOf(value) != -1) )
        }
        setUsersBlocks(users)
        // console.log('users ', users)
    }

    function filterByStatus(value:any) {
        const filterStatus = status[value]
        let users = filterStatus === 'all' ? usersList : usersList.filter( (user:any) => (user.active == filterStatus))
        setUsersBlocks(users)
        setFilterStatus(filterStatus)
        console.log('filter by status ', users)
    }

    return { usersList, usersBlocks, error, isLoading, addUser, deleteUser, modifyUserState, getSingleUser, filterBySearch, filterByStatus};
}

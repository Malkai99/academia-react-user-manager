import { useState, useEffect, useContext, useReducer } from 'react';
import { Button, Modal, TextField } from '@material-ui/core';
import UsersList from '../components/UsersList';
import ModalAddUser from '../components/ModalUserAdd'
import { reducer } from '../context/userReducer'
import { useUsersList } from '../hooks/useUsersList'
import UsersProvider from '../components/usersProvider'
import UserContext from '../context/userContext'
import '../App.css';

interface User {
  id: number,
  active: boolean,
  avatar: string,
  name: string,
  lastname: string,
  email: string,

}

const Layout = () => {
  const { usersList  }:any = useContext(UserContext);

//   console.log('contexto ', useContext(UserContext))


  // const [state, dispatch] = useReducer(reducer, initialArray)
  const [openModal, setModal] = useState(false);
  const [usersTest, setUserList] = useState([]);


  useEffect(() => {
    console.log('entro al user data ', usersList)
  }, [usersList]);

  useEffect(() => {
    // console.log('refresh ', usersList)
  }, [usersList]);

  function handleModal() {
    setModal(!openModal);
  }

  return (
    <>
      <div className="app-header">    
        <h1>User Manager {usersList.length}</h1>
        <Button variant="contained" color="primary" onClick={handleModal} >Agregar</Button>
      </div>
      <UsersList modifyUserList={setUserList} />
      <ModalAddUser usersList={usersList} setUserList={setUserList} modal={openModal} setModal={setModal} />
    </>
  );
}

export default Layout;

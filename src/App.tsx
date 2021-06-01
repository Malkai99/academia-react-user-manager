import { useState, useEffect, useContext, useReducer } from 'react';
import { Button, Modal, TextField } from '@material-ui/core';
import UsersList from './components/UsersList';
import ModalAddUser from './components/ModalUserAdd'
import { reducer } from './context/userReducer'
import { useUsersList } from './hooks/useUsersList'
import './App.css';

interface User {
  id: number,
  active: boolean,
  avatar: string,
  name: string,
  lastname: string,
  email: string,

}

function App() {
  const { usersData } = useUsersList()

  console.log('use get user ', usersData)


  // const [state, dispatch] = useReducer(reducer, initialArray)

  const [currentIndex, setCurrentIndex] = useState(10+1)
  const [openModal, setModal] = useState(false);
  const [usersList, setUserList] = useState([]);

  // const context = useContext();

  useEffect(() => {
    setUserList(usersData)
  }, [usersData]);

  useEffect(() => {
    console.log('refresh ', usersList)
  }, [usersList]);

  function handleModal() {
    setModal(!openModal);
  }

  return (
    <>
      <div className="app-header">        
        <h1>User Manager (4)</h1>
        <Button variant="contained" color="primary" onClick={handleModal} >Agregar</Button>
      </div>
    
      <UsersList usersList={usersList} modifyUserList={setUserList} />

      <ModalAddUser usersList={usersList} setUserList={setUserList} modal={openModal} setModal={setModal} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
    </>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { Button, Modal, TextField } from '@material-ui/core';
import UsersList from './components/UsersList';
import ModalAddUser from './components/ModalUserAdd'
import './App.css';

interface User {
  avatar: string,
  name: string,
  lastname: string,
  email: string,

}

function App() {
  const initialArray = [
    {id:1, avatar: "https://i.pinimg.com/originals/7e/67/eb/7e67eb044ae737a98b8779c6332dc179.jpg", name: 'Name', lastname: 'LastName', email: '(test@test.com)'},
    {id:2, avatar: "https://i.pinimg.com/originals/7e/67/eb/7e67eb044ae737a98b8779c6332dc179.jpg", name: 'Name', lastname: 'LastName', email: '(test@test.com)'},
    {id:3, avatar: "https://i.pinimg.com/originals/7e/67/eb/7e67eb044ae737a98b8779c6332dc179.jpg", name: 'Name', lastname: 'LastName', email: '(test@test.com)'},
    {id:4, avatar: "https://i.pinimg.com/originals/7e/67/eb/7e67eb044ae737a98b8779c6332dc179.jpg", name: 'Name', lastname: 'LastName', email: '(test@test.com)'}
  ];
  const [currentIndex, setCurrentIndex] = useState(initialArray.length)
  const [openModal, setModal] = useState(false);
  const [usersList, setUserList] = useState(initialArray)

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

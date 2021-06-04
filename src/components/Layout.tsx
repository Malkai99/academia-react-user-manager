import { useState, useContext, } from 'react';
import { Button } from '@material-ui/core';
import UsersList from '../components/UsersList';
import ModalAddUser from '../components/ModalUserAdd'
// import { reducer } from '../context/userReducer'
import UserContext from '../context/userContext'
import '../App.css';



const Layout = () => {
  const { usersList }:any = useContext(UserContext);
  const [openModal, setModal] = useState(false);
  // const [state, dispatch] = useReducer(reducer, initialArray)

  function handleModal() {
    setModal(!openModal);
  }

  return (
    <>
      <div className="app-header">    
        <h1>User Manager {usersList.length}</h1>
        <Button variant="contained" color="primary" onClick={handleModal} >Agregar</Button>
      </div>
      <UsersList />
      <ModalAddUser modal={openModal} setModal={setModal} />
    </>
  );
}

export default Layout;

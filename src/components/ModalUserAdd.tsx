import { useState, useEffect, useContext } from 'react';
import { Button, Modal, TextField } from '@material-ui/core';
import UserContext from '../context/userContext'
import { error } from 'console';

interface IProps{
    modal: any;
    setModal: any;
}

const ModalUserAdd = ({ modal, setModal }: IProps)  => {

  const { usersList, addUser }:any = useContext(UserContext)
  const inputName = (document.getElementById('input_name') as HTMLInputElement);
  const inputLastName = (document.getElementById('input_lastname') as HTMLInputElement);
  const inputEmail = (document.getElementById('input_email') as HTMLInputElement);
  const [errorInput, setErroInput] = useState({name: false, lastName: false, email: false})
  const [currentIndex, setCurrentIndex] = useState(0)
  let userInfo = {
    id: 0,
    active: false,
    avatar: "https://i.pinimg.com/originals/7e/67/eb/7e67eb044ae737a98b8779c6332dc179.jpg",
    name: '',
    lastname: '',
    email: '',
  };
  const [user, setUser] = useState(userInfo)

  useEffect(() => {
    setCurrentIndex(usersList.length + 1)
  }, [usersList]);

  useEffect(() => {
    setUser({...user, id: currentIndex});
  }, [currentIndex]);


  function handleInputs(event:any, target:string) {
    if(target === 'name'){
      setUser({...user, name: event.currentTarget.value})
      console.log('event.currentTarget.value ', event.currentTarget.value)
      if(event.currentTarget.value !== ''){
        setErroInput({...errorInput, name: false})
      }
    }
    if(target === 'lastname'){
      setUser({...user, lastname: event.currentTarget.value})
      if(event.currentTarget.value !== ''){
        setErroInput({...errorInput, lastName: false})
      }
    }
    if(target === 'email'){
      setUser({...user, email: event.currentTarget.value})
      if(event.currentTarget.value !== ''){
        setErroInput({...errorInput, email: false})
      }
    }
  }

  function cleanInputs() {
    inputName.value = '';
    inputLastName.value = '';
    inputEmail.value = '';
  }

  function validateForm(): boolean {
    if(user.name !== '' && user.lastname !== '' && user.email !== ''){
      return true;
    }
    setErroInput({name: true, lastName: true, email: true})
    if(user.name !== ''){
      setErroInput({...errorInput, name: false})
    }
    if(user.lastname !== ''){
      setErroInput({...errorInput, lastName: false})
    }
    if(user.email !== ''){
      setErroInput({...errorInput, email: false})
    }
    console.log('se modifcaron los prop ', errorInput)
    return false;
  }

  function addNewUser() {
    if(!validateForm()) return alert('Los campos no estan llenos')
    addUser(user);
    cleanInputs();
    setModal(!modal);
  }
    return (
        <Modal
            open={modal}>
          <div className="add-user-modal">
            <h1>Agregar Usuario</h1>
            <div>
              {/* inputProps={nameProps} */}
              <TextField error={errorInput.name} required id='input_name' onChange={(e) => handleInputs(e,'name')} className="user-modal-input" variant="outlined" label="first name"></TextField>
              <TextField error={errorInput.lastName} required id='input_lastname' onChange={(e) => handleInputs(e,'lastname')} className="user-modal-input" variant="outlined" label="last name"></TextField>
              <TextField error={errorInput.email} required id='input_email' onChange={(e) => handleInputs(e,'email')} className="user-modal-input" variant="outlined" label="email"></TextField>
            </div>

            <div className="actions">
              <Button onClick={() => setModal(!modal)} >Cerrar</Button>
              <Button onClick={() => addNewUser()} >Agregar</Button>
            </div>
          </div>
      </Modal>
    )
}


export default ModalUserAdd

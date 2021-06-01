import { useState, useRef, useEffect } from 'react';
import { Button, Modal, TextField } from '@material-ui/core';
import { useUsersList } from '../hooks/useUsersList'

interface IProps{
    modal: any;
    setModal: any;
    currentIndex: any;
    setCurrentIndex: any;
    usersList: any;
    setUserList: any;
}

const ModalUserAdd = ({ modal, setModal, currentIndex, setCurrentIndex, usersList, setUserList }: IProps)  => {
  const { addUser } = useUsersList();
  const inputName = (document.getElementById('input_name') as HTMLInputElement);
  const inputLastName = (document.getElementById('input_lastname') as HTMLInputElement);
  const inputEmail = (document.getElementById('input_email') as HTMLInputElement);
  const [nameProps, setnameProps] = useState({error: true})
  let userInfo = {
    id: 0,
    avatar: "https://i.pinimg.com/originals/7e/67/eb/7e67eb044ae737a98b8779c6332dc179.jpg",
    name: '',
    lastname: '',
    email: '',
  };
  const [user, setUser] = useState(userInfo)

  useEffect(() => {
    setUser({...user, id: currentIndex});
  }, [currentIndex]);

  useEffect(() => {
    console.log('current index ', currentIndex)
  }, [currentIndex]);

  function handleInputs(event:any, target:string) {
    if(target === 'name'){
      setUser({...user, name: event.currentTarget.value})
    }
    if(target === 'lastname'){
      setUser({...user, lastname: event.currentTarget.value})
    }
    if(target === 'email'){
      setUser({...user, email: event.currentTarget.value})
    }
  }

  function cleanInputs() {
    inputName.value = '';
    inputLastName.value = '';
    inputEmail.value = '';
  }

  function validateForm(): boolean {
    if(user.name != '' && user.lastname != '' && user.email != ''){
      return true;
    }
    setnameProps({error: true})
    console.log('se modifcaron los prop ', nameProps)
    return false;
  }

  function addNewUser() {
    if(!validateForm()) return alert('Los campos no estan llenos')
    console.log('this is the user ', user)
    addUser(user);
    setCurrentIndex(currentIndex + 1);
    // setUserList([...usersList, user])
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
              <TextField error  required id='input_name' onChange={(e) => handleInputs(e,'name')} className="user-modal-input" variant="outlined" label="first name"></TextField>
              <TextField required id='input_lastname' onChange={(e) => handleInputs(e,'lastname')} className="user-modal-input" variant="outlined" label="last name"></TextField>
              <TextField required id='input_email' onChange={(e) => handleInputs(e,'email')} className="user-modal-input" variant="outlined" label="email"></TextField>
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

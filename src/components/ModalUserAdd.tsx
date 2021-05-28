import { useState, useRef, useEffect } from 'react';
import { Button, Modal, TextField } from '@material-ui/core';

interface IProps{
    modal: any;
    setModal: any;
    currentIndex: any;
    setCurrentIndex: any;
    usersList: any;
    setUserList: any;
}

const ModalUserAdd = ({ modal, setModal, currentIndex, setCurrentIndex, usersList, setUserList }: IProps)  => {
  const inputName = useRef(null);
  const inputLastName = useRef(null);
  const inputEmail = useRef(null);
  let userInfo = {
    id: currentIndex+1,
    avatar: "https://i.pinimg.com/originals/7e/67/eb/7e67eb044ae737a98b8779c6332dc179.jpg",
    name: '',
    lastname: '',
    email: '',
  };
  const [user, setUser] = useState(userInfo)

  useEffect(() => {
    console.log('current index ', currentIndex)
  }, []);

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
    (document.getElementById('input_name') as HTMLInputElement).value = '';
    (document.getElementById('input_lastname') as HTMLInputElement).value = '';
    (document.getElementById('input_email') as HTMLInputElement).value = '';
  }

  function addNewUser() {
    setCurrentIndex(currentIndex + 1);
    console.log('this is the user ', user)
    setUserList([...usersList, user])
    cleanInputs();
    setModal(!modal);
  }
    return (
        <Modal
            open={modal}>
          <div className="add-user-modal">
            <h1>Agregar Usuario</h1>
            <div>
              <TextField id='input_name' inputRef={inputName} onChange={(e) => handleInputs(e,'name')} className="user-modal-input" variant="outlined" label="first name"></TextField>
              <TextField id='input_lastname' inputRef={inputLastName} onChange={(e) => handleInputs(e,'lastname')} className="user-modal-input" variant="outlined" label="last name"></TextField>
              <TextField id='input_email' inputRef={inputEmail} onChange={(e) => handleInputs(e,'email')} className="user-modal-input" variant="outlined" label="email"></TextField>
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

import UsersProvider from './components/usersProvider'
import Layout from './components/Layout'
import { useUsersList } from './hooks/useUsersList'
import UserContext from './context/userContext'


function App() {
  const initialValue = useUsersList()
  console.log('initial value ', initialValue)

  return (
    <UserContext.Provider value={initialValue}>
      <Layout />
    </UserContext.Provider>
  );
}

export default App;

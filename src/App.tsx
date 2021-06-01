import UsersProvider from './components/usersProvider'
import Layout from './components/Layout'


function App() {


  return (
    <UsersProvider>
      <Layout />
    </UsersProvider>
  );
}

export default App;

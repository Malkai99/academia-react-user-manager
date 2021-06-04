import UsersProvider from './components/usersProvider'
import { Router } from './router/router'

function App() {

  return (
    <UsersProvider>
      <Router />
    </UsersProvider>
  );
}

export default App;

import UsersProvider from './components/usersProvider'
import PaginationProvider from './providers/PaginationProvider'
import { Router } from './router/router'

function App() {

  return (
    <UsersProvider>
      <PaginationProvider>
        <Router />
      </PaginationProvider>
    </UsersProvider>
  );
}

export default App;

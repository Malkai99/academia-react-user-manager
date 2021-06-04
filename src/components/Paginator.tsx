import { useContext } from 'react'
import { MemoryRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import UserContext from '../context/userContext'

const Paginator = () => {
    const { usersList }:any = useContext(UserContext);

    return (
        <MemoryRouter initialEntries={['/users']} initialIndex={0}>
            <Route>
                {({ location }) => {
                    console.log('location ', location)
                    const query = new URLSearchParams(location.search);
                    const page = parseInt(query.get('page') || '1', 10);
                    return (
                        <Pagination
                        page={page}
                        count={10}
                        renderItem={(item) => (
                            <PaginationItem
                            component={Link}
                            to={`/users${item.page === 1 ? '' : `?page=${item.page}`}`}
                            {...item}
                            />
                        )}
                        />
                    );
                }}
            </Route>
        </MemoryRouter>
    )
}

export default Paginator

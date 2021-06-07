import { useContext } from 'react'
import { MemoryRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import UserContext from '../context/userContext';
import paginationContext from '../context/paginationContext';

const Paginator = () => {
    const { usersBlocks }:any = useContext(UserContext);
    const { itemsPerPage, setPage }:any = useContext(paginationContext);

    function handlePage(event:any, value:any) {
        setPage(value)
    }
    
    return (
        <MemoryRouter initialEntries={['/users']} initialIndex={0}>
            <Route>
                {({ location }) => {
                    const query = new URLSearchParams(location.search);
                    const page = parseInt(query.get('page') || '1', 10);
                    let count = Math.ceil(usersBlocks.length/itemsPerPage)
                    return (
                        <Pagination
                        page={page}
                        count={count}
                        onChange={handlePage}
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

import PaginationContext from '../context/paginationContext'
import { usePaginator } from '../hooks/usePaginator'

const PaginationProvider = ({ children }:any ) => {
    const initialValue = usePaginator()
    return (
        <PaginationContext.Provider value={initialValue}>
            {children}
        </PaginationContext.Provider>
    )
}

export default PaginationProvider
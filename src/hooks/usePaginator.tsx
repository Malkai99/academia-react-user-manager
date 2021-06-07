import { useState } from 'react'

export const usePaginator = () => {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    function getBlockUsers(userList:any) {
        const indexLast = page * itemsPerPage;
        const indexFirst = indexLast - itemsPerPage;
        const blockUsers = userList.slice(indexFirst, indexLast)
        return blockUsers;

    }

    return { page, itemsPerPage, setPage, getBlockUsers }
}

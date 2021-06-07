import { useState, useContext } from 'react'
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField } from '@material-ui/core';
import UserContext from '../context/userContext'

const Filter = () => {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('all');
    const { filterBySearch, filterByStatus }:any = useContext(UserContext);

    function handleFilterSearch(event:any) {
        filterBySearch(event.target.value)
    }

    function handleFilterStatus(event:any) {
        setStatus(event.target.value)
        filterByStatus(event.target.value)
    }

    return (
        <div className="filter__container">
            <TextField onChange={(e) => handleFilterSearch(e)} className="filter-input" label="Filter"></TextField>
            <FormControl className="fieldset__container" component="fieldset">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup className="radio__container" aria-label="status" name="status-filter" value={status} onChange={handleFilterStatus}>
                    <FormControlLabel value="online" control={<Radio />} label="Online" />
                    <FormControlLabel value="offline" control={<Radio />} label="Offline" />
                    <FormControlLabel value="all" control={<Radio />} label="All" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default Filter

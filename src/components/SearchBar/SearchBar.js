import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchBar.css';

function SearchBar({ data }) {

    const [filteredData, setFilteredData] = useState([]);

    const handleFilter = (e) => {
        const searchWord = e.target.value
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase()) || value.id.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        };
    };

    /*const customPopper = (props) => {
        return <Popper {...props} sx={{ color: 'primary.main' }} />
    }*/

    return (
        <div className='search-bar-container'>
            {/*<Autocomplete
                id="free-solo-demo"
                freeSolo
                options={data.slice(0, 15).map((option) => option.name)}
                renderInput={(params) => <TextField {...params} label="freeSolo" />}
                sx={{ height: '36px', width: '300px', padding: 0, backgroundColor: '#2E2F32' }}
                PopperComponent={customPopper}
    />*/}
            <div className='search-bar-input'>
                <input type='text' placeholder='Search coins...' onChange={handleFilter} />
            </div>
            {filteredData.length != 0 && (
                <div className='search-bar-output'>
                    {filteredData.slice(0, 15).map((value, key) => {
                        return (
                            <a key={key}>
                                <Link to={`/coin/${value.id}`}>
                                    <p>{value.name}</p>
                                </Link>
                            </a>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchBar
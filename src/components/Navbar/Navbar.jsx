import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PageContext } from '../../helpers/pageContext';
import SearchBar from '../SearchBar/SearchBar';
import USFlag from '../../assets/usa.png';
import MYFlag from '../../assets/malaysia.png';
import './Navbar.css';

function Navbar({ data }) {

    const { currency, setCurrency } = useContext(PageContext);

    const handleCurrency = (e) => {
        e.preventDefault();

        setCurrency(e.target.value);
    };

    return (
        <div className='navbar-header'>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <h1>Crypto</h1>
            </Link>
            <div className='navbar-currency'>
                {data ? <SearchBar data={data} /> : null}
                <p>Currency: </p>
                {/*<select onChange={handleCurrency}>
                    <option value='usd'>USD</option>
                    <option value='myr'>MYR</option>
    </select>*/}
                <div className={currency === 'usd' ? 'navbar-currency-select-usd' : 'navbar-currency-select-myr'}>
                    <p className='currency-usd' onClick={() => setCurrency('usd')}><img src={USFlag} alt='usa' />USD</p>
                    <p>/</p>
                    <p className='currency-myr' onClick={() => setCurrency('myr')}><img src={MYFlag} alt='malaysia' />MYR</p>
                </div>
            </div>
        </div>
    )
}

export default Navbar
import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className='footer'>
            <p>For learning purpose only. 2022@Bryan - <a href='mailto: bryanhum732@gmail.com' style={{ textDecoration: 'none' }}>bryanhum732@gmail.com</a></p>
            <p>API provided by: <a href='https://www.coingecko.com/' target='_blank' style={{ textDecoration: 'none' }}>CoinGecko</a></p>
        </div>
    )
}

export default Footer
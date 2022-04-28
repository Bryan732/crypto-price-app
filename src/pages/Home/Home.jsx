import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { PageContext } from '../../helpers/pageContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Home.css';

const useStyles = makeStyles(() => ({
    ul: {
        "& .MuiPaginationItem-root": {
            color: "#fff"
        }
    }
}));

function Home() {

    const { currency, setCurrency } = useContext(PageContext);
    const [coinList, setCoinList] = useState([]);
    const [page, setPage] = useState(1);
    const classes = useStyles();

    useEffect(() => {
        axios
            .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${page}&sparkline=true&price_change_percentage=1h%2C24h`)
            //https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=true
            //https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h
            .then((res) => {
                setCoinList(res.data);
            })
    }, [currency, page]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    if (coinList === null) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    };

    return (
        <div>
            <Navbar data={coinList} />
            <table>
                <thead>
                    <tr>
                        <th>TOKEN</th>
                        <th>PRICE / COIN</th>
                        <th>CHANGE LAST 1H</th>
                        <th>CHANGE LAST 24H</th>
                        <th>DYNAMIC CHANGE</th>
                    </tr>
                </thead>
                <tbody>
                    {coinList.map((coin, index) => {
                        return (
                            <tr key={coin.id} index={index} className={index === 0 || index % 2 === 0 ? 'table-background-even' : 'table-background-odd'} >
                                <Link to={`/coin/${coin.id}`} style={{ textDecoration: 'none' }}>
                                    <td className='table-data-token'><img src={coin.image} alt={coin.id} style={{ width: 30, height: 'auto', marginRight: 10, marginLeft: 20 }} />{coin.name}<span style={{ color: 'grey', marginLeft: 10 }}>{coin.symbol.toUpperCase()}</span></td>
                                </Link>
                                <td>{currency === 'usd' ? '$' : 'MYR'} {coin.current_price.toLocaleString(undefined, { maximumFractionDigits: 10 })}</td>
                                <td className={coin.price_change_percentage_1h_in_currency > 0 ? 'table-data-change-green' : 'table-data-change-red'}>{coin.price_change_percentage_1h_in_currency.toFixed(2)} %</td>
                                <td className={coin.price_change_percentage_24h > 0 ? 'table-data-change-green' : 'table-data-change-red'}>{coin.price_change_percentage_24h.toFixed(2)} %</td>
                                <td className='table-data-graph' style={{ height: 50, width: 150 }}>
                                    <Line
                                        data={{
                                            labels: coin?.sparkline_in_7d?.price.map((price, index) => index),
                                            datasets: [{
                                                label: 'Price',
                                                data: coin?.sparkline_in_7d?.price,
                                                fill: false,
                                                borderColor: coin?.price_change_percentage_1h_in_currency > 0 ? '#BCFE2F' : '#FF4C00',
                                                borderWidth: 2,
                                                tension: 0.1,
                                                pointBorderColor: 'rgb(75, 192, 192)',
                                                pointRadius: 0,
                                            }]
                                        }}
                                        options={{
                                            plugins: {
                                                legend: {
                                                    display: false
                                                },
                                                title: {
                                                    display: false
                                                },
                                            },
                                            scales: {
                                                yAxes: {
                                                    display: false
                                                },
                                                xAxes: {
                                                    display: false
                                                }
                                            },
                                            elements: {
                                                point: {
                                                    radius: 0
                                                }
                                            },
                                            responsive: false,
                                            maintainAspectRatio: false
                                        }}
                                        style={{ height: 40, width: 200, marginRight: 10 }}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='pagination'>
                <Pagination classes={{ ul: classes.ul }} count={10} shape='rounded' color='secondary' sx={{ color: 'red' }} page={page} onChange={handleChange} />
            </div>
            <Footer />
        </div>
    )
}

export default Home
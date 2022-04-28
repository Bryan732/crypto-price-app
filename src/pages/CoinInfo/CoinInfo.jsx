import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import moment from 'moment';
import { PageContext } from '../../helpers/pageContext';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './CoinInfo.css';

function CoinInfo() {

    const { id } = useParams();
    const { currency, setCurrency } = useContext(PageContext);
    const [coinInfo, setCoinInfo] = useState('');

    let time = [];
    for (var i = 0; i < coinInfo?.market_data?.sparkline_7d?.price.length; i++) {
        time.push(moment().subtract(i, 'hour').format('LLL'));
    };

    useEffect(() => {
        try {
            axios
                .get(`https://api.coingecko.com/api/v3/coins/${id}?sparkline=true`)
                .then((res) => {
                    setCoinInfo(res.data);
                });
        } catch (err) {
            console.log(err);
        }
    }, [id]);

    return (
        <div>
            <Navbar />
            {!coinInfo ? (
                <>
                    Loading...
                </>
            ) : (
                <>
                    <div style={{ marginTop: 50, marginBottom: 50 }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <img src={coinInfo?.image?.small} alt='coin image' style={{ width: 50, height: 50, marginLeft: 0, alignSelf: 'center' }} />
                            <h1 style={{ marginLeft: 40 }}>{coinInfo?.name}</h1>
                            <h1 style={{ marginLeft: 40 }}>{coinInfo?.symbol.toUpperCase()}</h1>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                            <div className='current-price'>
                                <h4>Price</h4>
                                <h2>{currency === 'usd' ? '$' : 'MYR'} {currency === 'usd' ? coinInfo?.market_data?.current_price?.usd.toLocaleString(undefined, { maximumFractionDigits: 10 }) || null : coinInfo?.market_data?.current_price?.myr.toLocaleString(undefined, { maximumFractionDigits: 10 }) || null}</h2>
                            </div>
                            <div className='change-in-24h'>
                                <h4>Change in 24 hours</h4>
                                <div>
                                    <h2 style={{ margin: 0 }}>{currency === 'usd' ? '$' : 'MYR'} {currency === 'usd' ? coinInfo?.market_data?.price_change_24h_in_currency?.usd.toLocaleString(undefined, { maximumFractionDigits: 8 }) || null : coinInfo?.market_data?.price_change_24h_in_currency?.myr.toLocaleString(undefined, { maximumFractionDigits: 8 }) || null}</h2>
                                    {currency === 'usd' ? <>{coinInfo?.market_data?.price_change_24h_in_currency?.usd > 0 ? <ArrowDropUpIcon className='UpIcon' /> : <ArrowDropDownIcon className='DownIcon' />}</> : <>{coinInfo?.market_data?.price_change_24h_in_currency?.myr > 0 ? <ArrowDropUpIcon className='UpIcon' /> : <ArrowDropDownIcon className='DownIcon' />}</>}
                                </div>
                            </div>
                            <div className='market-cap'>
                                <h4>Market Cap</h4>
                                <h2>{currency === 'usd' ? '$' : 'MYR'} {currency === 'usd' ? coinInfo?.market_data?.market_cap?.usd.toLocaleString(undefined, { maximumFractionDigits: 10 }) || null : coinInfo?.market_data.market_cap?.myr.toLocaleString(undefined, { maximumFractionDigits: 10 }) || null}</h2>
                            </div>
                            <div className='high-24h'>
                                <h4>Highest (24h)</h4>
                                <h2>{currency === 'usd' ? '$' : 'MYR'} {currency === 'usd' ? coinInfo?.market_data?.high_24h?.usd.toLocaleString(undefined, { maximumFractionDigits: 10 }) || null : coinInfo?.market_data?.high_24h?.myr.toLocaleString(undefined, { maximumFractionDigits: 10 }) || null}</h2>
                            </div>
                            <div className='low-24h'>
                                <h4>Lowest (24h)</h4>
                                <h2>{currency === 'usd' ? '$' : 'MYR'} {currency === 'usd' ? coinInfo?.market_data?.low_24h?.usd.toLocaleString(undefined, { maximumFractionDigits: 10 }) || null : coinInfo?.market_data?.low_24h?.myr.toLocaleString(undefined, { maximumFractionDigits: 10 }) || null}</h2>
                            </div>
                        </div>
                        <div>
                            <h3>Info: </h3>
                            <p dangerouslySetInnerHTML={{
                                __html: coinInfo?.description?.en || null
                            }}></p>
                        </div>
                    </div>
                    <Line
                        data={{
                            labels: time.sort((a, b) => a - b).reverse(),
                            datasets: [{
                                label: 'Price',
                                data: coinInfo?.market_data?.sparkline_7d?.price,
                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1,
                                pointBorderColor: 'rgb(75, 192, 192)',
                            }],
                        }}
                        options={{
                            plugins: {
                                legend: {
                                    display: true
                                },
                                title: {
                                    display: true,
                                    text: 'Price history in 7 days',
                                    color: 'white',
                                    font: {
                                        size: 20
                                    }
                                },
                            },
                            elements: {
                                point: {
                                    radius: 3
                                }
                            }
                        }}
                    />
                    {/*coinInfo?.market_data?.sparkline_7d?.price.map((price, index) => {
                        return <p key={index}>{price.toLocaleString()}</p>
                    })*/}
                </>
            )}
            <Footer />
        </div>
    )
}

export default CoinInfo
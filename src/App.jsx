import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageContext } from './helpers/pageContext';
import './App.css';

// pages
import Home from './pages/Home/Home';
import CoinInfo from './pages/CoinInfo/CoinInfo';

function App() {

    const [currency, setCurrency] = useState('usd');

    return (
        <div className="App">
            <PageContext.Provider value={{ currency, setCurrency }}>
                <Router>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/coin/:id' element={<CoinInfo />} />
                        <Route path='*' element={<Home />} />
                    </Routes>
                </Router>
            </PageContext.Provider>
        </div>
    );
}

export default App;

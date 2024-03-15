import React from 'react';
import { Route, Routes } from 'react-router-dom'
import SearchPage from '../pages/SearchPage';

const PokeRouter = () => {
    return (
        <Routes>

            <Route path="/" element={ <SearchPage /> } />

        </Routes>
    );
}

export default PokeRouter;

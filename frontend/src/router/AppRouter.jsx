import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PokeRouter from '../pokemon/router/pokeRouter';
import { AuthRouter } from '../auth/router/AuthRouter';

export const AppRouter = () => {

    const login = false

    return (
        <Routes>

            {login
            ?<Route path='/*' element={<PokeRouter/>} />
            :<Route path='*' element={<AuthRouter/>} />
            }

        </Routes>
    );
}



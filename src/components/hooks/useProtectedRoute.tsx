// eslint-disable-next-line to the line before.
import React, { useState, useEffect } from 'react';
import { post } from '../utils/api';
export const useProtectedRoute = () => {
    const [state, setState] = useState(false);
    useEffect(() => {
        post(`/protected-route`).then((result: any) => {
            setState(true);
        }).catch((err: Error) => {
            localStorage.clear();
            setState(false)
            console.error(err);
        });
    }, []);
    return state;
}
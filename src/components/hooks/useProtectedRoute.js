import React, { useState, useEffect } from 'react';
import instance from "../utils/api";
export const useProtectedRoute = () => {
    const [state, setState] = useState(false);
    useEffect(() => {
        instance.post(`/protected-route`).then((result) => {
            setState(true);
        }).catch(err => {
            localStorage.clear("token");
            setState(false)
            console.error(err);
        });
    }, []);
    return state;
}
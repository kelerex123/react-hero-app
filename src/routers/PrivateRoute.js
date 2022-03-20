import React from 'react'
import {Navigate, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({children, isAuthenticated}) => {

    const {pathname} = useLocation();

    localStorage.setItem('lastPath', pathname)

    return isAuthenticated ? children : <Navigate  to='/login' />

}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}

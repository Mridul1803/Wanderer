import React, { useContext} from 'react'
import {AuthContext} from '../../Context/AuthProvider'
import {Route, Redirect} from 'react-router-dom';

function PrivateRoute2( {component:Component, ...rest} ) {
    const {currentUser} = useContext(AuthContext);
    return (
        <Route {...rest} render={props => {
            return currentUser ? <Component {...props} /> : <Redirect to='/signin' />
        }} />
    )
}

export default PrivateRoute2

import React, {useState, useContext} from 'react'
import {AuthContext} from '../../Context/AuthProvider'
import {Route, Redirect} from 'react-router-dom';

function PrivateRoute( {component:Component, ...rest} ) {
    const {currentUser} = useContext(AuthContext);
    return (
        // <h1>Hey there</h1>
        <Route {...rest} render={props => {
            return currentUser ? <Component {...props} /> : <Redirect to='/signin' />
        }} />
    )
}

export default PrivateRoute

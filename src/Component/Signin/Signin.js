import React, {useContext, useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import {AuthContext} from '../../Context/AuthProvider';
// import {auth} from '../firebase'
import './Signin.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Signin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [signincalled, setsignincalled] = useState(false)
    const {login, currentUser} = useContext(AuthContext);
    const history = useHistory();
    const handleSignin = async(e)=>{
        e.preventDefault();
        
        try{
            setsignincalled(true);
            setLoading(true);
            let res = await login(email, password);
            console.log(res);
            setLoading(false);
            history.push('/');
        }
        catch(err){
            setError('failed');
            console.log(error);
            setLoading(false);
        }
        
    }
    useEffect( ()=>{
        if(currentUser)
        {
            history.push('/');
        }
    },[] );
    return (
        <div className='login-container'>
            <div className='login-modal' >
                <div className='wallpaper-div' >
                </div>
                <div className='input-div' >

                            <div className='heading-div' >
                                Welcome to Wanderer !
                            </div>

                            <TextField value={email} id="outlined-basic" style={ {margin:'5px 0 0 0'} }
                                        onChange={(e)=>setEmail(e.target.value)} label="Email" variant="outlined" />
                            <TextField
                                        style={ {margin:'20px 0 0 0'} }
                                        id="outlined-password-input"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        variant="outlined"
                                        value={password} onChange={(e)=>setPassword(e.target.value)}
                            />
                            <Button variant="contained" color="primary" style={ {margin:'35px 0 0 0'} } onClick={handleSignin} disabled={loading} >
                                Sign In
                            </Button>
                            <div className='signup-link' >
                                New to WANDERER ? <Link to='/signup' style={{textDecoration:"none"}} >Create Account</Link>
                            </div>
                            { error ? <h4> {error} </h4> : <></> }
                            
                </div>
            </div>
        </div>
    )
}

export default Signin

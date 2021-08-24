import React, {useContext, useState, useEffect} from 'react'
import {AuthContext} from '../../Context/AuthProvider'
import {storage, database} from '../../firebase'
import { useHistory, Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles= makeStyles({
    input: {
        display: 'none',
    },
})
function Signup() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [file, setFile] = useState(null);
    const history = useHistory();
    const {signup, currentUser} = useContext(AuthContext);
    // console.log(signup);

    const handleSignup = async(e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            let res = await signup(email, password);
            let uid = res.user.uid;
            console.log(uid);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            // fn 1 -> progress tracking
            // fn2 -> error
            // fn3 -> success

            const uploadTaskListener = storage.ref( `/users/${uid}/profileImage` ).put(file);
            uploadTaskListener.on( 'state_changed', fn1, fn2, fn3 );

            function fn1( snapshot )
            {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }
            function fn2( error)
            {
                setError(error);
                setTimeout( ()=>{
                    setError();
                }, 2000 );
                setLoading(false);
            }
            async function fn3()
            {
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                console.log(downloadUrl);

                await database.users.doc(uid).set({
                    email:email,
                    userId : uid,
                    username : name,
                    createdAt : database.getCurrentTimeStamp(),
                    profileURL : downloadUrl,
                    postIds : []
                })
                setLoading(false);
                console.log("User signed up !");
                history.push('/');
            }
        }
        catch(err){
            setError(err);
            setTimeout( ()=>setError(''), 2000 );
            setLoading(false);
        }
    }

    useEffect( ()=>{
        if(currentUser)
        {
            history.push('/');
        }
    },[currentUser, history] );

    const handleFileSubmit = (e)=>{
        let file = e.target.files[0];
        console.log(file);
        if( file!= null )
        {
            setFile(file);
        }
    }

    return (

        <div className='login-container'>
            <div className='login-modal' >
                <div className='wallpaper-div' >
                </div>
                <div className='input-div' >

                            <div className='heading-div' >
                                Let's get Started !
                            </div>
                            <TextField value={name} id="outlined-basic" style={ {margin:'5px 0 0 0'} }
                                        onChange={(e)=>setName(e.target.value)} label="Name" variant="outlined" />
                            <TextField value={email} id="outlined-basic" style={ {margin:'20px 0 0 0'} }
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
                            <input
                                accept="image/jpg"
                                className={classes.input}
                                id="contained-button-file"
                                type="file"
                                onChange={handleFileSubmit}
                            />
                            <label htmlFor="contained-button-file" style={ {marginTop:'4%'} } >
                                <Button variant="contained" color="secondary" component="span">
                                Profile Image
                                </Button>
                            </label>
                            <Button variant="contained" color="primary" style={ {margin:'20px 0 0 0'} } onClick={handleSignup} disabled={loading} >
                                Sign Up
                            </Button>
                            <div className='signup-link' >
                                Already have an account ? <Link to='/signin' style={{textDecoration:"none"}} >Sign In</Link>
                            </div>
                            { error ? <h6> {error} </h6> : <></> }
                            
                </div>
            </div>
        </div>

        // <div>
        //     <form >
        //         <div>
        //             <label htmlFor=''>UserName</label>
        //             <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>

        //         </div>
        //         <div>
        //         <label htmlFor=''>Email</label>
        //             <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        //         </div>
        //         <div>
        //         <label htmlFor=''>Password</label>
        //             <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        //         </div>
        //         <div>
        //             <label htmlFor='profile'>Profile image</label>
        //             <input type='file' accept='image/*' onChange={handleFileSubmit}></input>
        //         </div>
        //         <button type='submit' onClick={handleSignup} disabled={loading}>Sign Up</button>
        //     </form>
        // </div>
    )
}

export default Signup

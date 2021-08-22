import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthProvider'
import { database } from '../../firebase';
import Header from '../Header/Header'
import Avatar from '@material-ui/core/Avatar';
import './Profile.css';
import { makeStyles } from '@material-ui/core';
import ProfilePost from './ProfilePost/ProfilePost';

const useStyle = makeStyles({
    root : {
        width: '100px',
        height: '100px',
    }
})

function Profile() {
    const classes = useStyle();

    const {currentUser} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState(null);

    useEffect( () => {
        const unsub = database.users.doc(currentUser.uid).onSnapshot( (doc)=>{
            setUserData(doc.data() );
        } )

    },[currentUser])
    
    useEffect( async ()=>{
        let postarr = [];
        
        for( let i=0; i<userData?.postIds?.length; ++i )
        {
            let data = await database.posts.doc( userData.postIds[i] ).get();
            postarr.push(data.data());
            console.log(data.data());
        }
        setPosts(postarr);
    }, [userData] )

    // console.log(userData)
    
    
    return (
        <div>
            <Header/>
            <div className='container' >

                <div className='top-container' >
                    <div className='avatar-div' >
                        <Avatar src={userData?.profileURL} style={{ height: '150px', width: '150px' }} className='avatar' />
                    </div>
                    <div className='info-div' >
                        <div className='name-div' >{userData?.username}</div>
                        <div className='email-div' >Email : {userData?.email}</div>
                        <div className='noofPost-div' >Number of Posts : {userData?.postIds.length}</div>
                        
                    </div>
                </div>

                <div className='bottom-container' >
                    {
                        posts==null ? <h1>No posts uploaded !</h1> :
                        posts.map( (post, index) =>{
                            return(
                                <ProfilePost source={post.pUrl} postData={post} userData={userData} />
                            )
                        } )
                        
                    }

                </div>

            </div>
        </div>
    )
}

export default Profile

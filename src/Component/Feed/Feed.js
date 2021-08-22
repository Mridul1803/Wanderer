import React, { useEffect, useState, useContext } from 'react'
import Header from '../Header/Header'
import {AuthContext} from '../../Context/AuthProvider';
import {database} from '../../firebase'
import UploadFile from './UploadFile/UploadFile';
import Posts from './Posts/Posts';
import './Feed.css'
function Feed() {
    const {currentUser} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect( ()=>{
        const unsub = database.users.doc( currentUser.uid ).onSnapshot( (doc)=>{
            setUserData(doc.data());
        } )
    }, [currentUser] );

    return (
        <>
            <Header/>
            {/* <div style={{height:'9.5vh'}} /> */}
            <div className='feed-container' >
                <div className='center' >
                    <UploadFile userData={userData} />
                    <Posts userData={userData} />
                </div>
            </div> 
        </>
    )
}

export default Feed

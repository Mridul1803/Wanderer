import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {makeStyles} from '@material-ui/core/styles';
import {database} from '../../../../firebase';
import './Likes.css';

const useStyles = makeStyles({
    like:{
        color : 'red',
        cursor : 'pointer'
    },
    unlike:{
        color:'white',
        cursor:'pointer'
    }
})
function Likes( {userData=null, postData=null} ) {
    const classes = useStyles();
    const [liked, setLiked] = useState(null);

    useEffect(()=>{
        
        let check = postData.likes.includes(userData?.userId) ? true : false;
        console.log(postData.likes, userData, check)
        setLiked(check);
    }, [postData])

    const handleLike = async()=>{

        if( liked == true )
        {
            let uarr = postData.likes.filter( uid=>{
                return uid!= userData.userId
            } )
            await database.posts.doc(postData.postId).update({
                likes : uarr
            })
        }
        else
        {
            await database.posts.doc(postData.postId ).update({
                likes : postData.likes.includes(userData.userId) ? postData.likes : [ ...postData.likes, userData.userId ]
            })
        }

    }

    return (
        <div className='likedclass' >
            {
                // liked != null ? 
                    <>
                        {liked == false ? <FavoriteIcon className={`${classes.unlike} icon-styling`} onClick={handleLike} /> : 
                                            <FavoriteIcon className={`${classes.like} icon-styling`} onClick={handleLike} />}
                    </>
                // :
                //     <>
                //     </>
            }
        </div>
    )
}

export default Likes

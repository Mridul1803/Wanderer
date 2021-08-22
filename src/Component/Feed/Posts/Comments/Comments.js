import React from 'react'
import {database} from '../../../../firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useState } from 'react';
import './Comment.css';

const useStyles = makeStyles({
    da:{
        marginRight:'2%',
        marginTop:'2%'
    }
})

function Comments({ userData=null, postData=null}) {
    const classes = useStyles();
    const [comments, setComments] = useState(null);
    useEffect( async()=>{
        let arr = [];

        for(let i=0; i<postData.comments.length; ++i)
        {
            let cid = postData.comments[i];
            let obj = await database.comments.doc(cid).get();
            arr.push(obj.data());
        }

        setComments(arr);
    }, [postData] )

    return (
        <div>
            {
                comments == null ?<CircularProgress />:
                comments.map( (comment, index)=>(
                    <div key={index} className='comment-div' >
                        <Avatar src={comment.pUrl} className={classes.da}  />
                        <p><span style={{fontWeight:'bold', display:'inline-block'}} >{comment.uName}</span> &nbsp;&nbsp;{comment.text}</p>
                    </div>
                ) )
            }
        </div>
    )
}

export default Comments

import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './AddComment.css'
import { database } from '../../../../firebase';
const useStyles = makeStyles({
    cbtn:{
        marginRight : '1%',
        marginTop : '4%'
    }
})

function AddComment( {userData=null, postData=null} ) {
    const classes = useStyles();
    const [text, setText] = useState('');
    const manageText = e=>{
        let comment = e.target.value;
        setText(comment);
    }
    const handleOnEnter = ()=>{
        let obj = {
            text : text,
            uName : userData.username,
            pUrl : userData.profileURL
        }
        // console.log(obj);
        database.comments.add(obj).then( docRef=>{
            
            database.posts.doc(postData.postId).update({
                comments : [...postData.comments, docRef.id]
            }).then( ()=>{
                setText('');
            }).catch(e=>{
                console.log(e);
            })
        } )


    }
    return (
        <div className='emojibox' >
            <TextField value={text} fullWidth={true} id="standard-basic" onChange={manageText} label="Add a comment" />
            <Button disabled={text==''?true:false} onClick={handleOnEnter} className={classes.cbtn} variant="contained" color="secondary">
                Post
            </Button>
        </div>
    )
}

export default AddComment

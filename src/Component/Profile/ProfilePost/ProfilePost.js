import React from 'react'
import { useState } from 'react'
import './ProfilePost.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddComment from '../../Feed/Posts/AddComment/AddComment';
import Comments from '../../Feed/Posts/Comments/Comments';
const useStyles= makeStyles({

})

function ProfilePost({source, postData=null, userData=null}) {

    const classes = useStyles();
    const [openId, setopenId] = useState(null)

    const handleOpen = ()=>{
        setopenId(postData.pId)
    }

    const handleClose =()=>{
        setopenId(null);
    }

    return (
        <div className='post-div'  >
            <video src={source} onClick={handleOpen} paused='paused' ></video>
            <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId === postData.pId}>
                <MuiDialogContent>
                    <div className='dcontainer'>
                        <div className='video-part'>
                            <video autoPlay={true} className='video-styles2' controls muted="muted" type="video/mp4" >
                                <source src={postData.pUrl} type="video/webm" />
                            </video>
                        </div>
                        <div className='info-part'>
                            <Card>
                                <CardHeader
                                    avatar={
                                        <Avatar src={postData?.uProfile} aria-label="recipe" className={classes.avatar}>
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={postData?.uName}

                                />

                                <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
                                <CardContent className={classes.seeComments}>
                                    <Comments postData={postData} userData={userData} />
                                </CardContent>

                            </Card>
                            <div className='extra'>
                                <div className='likes'>
                                    <Typography className={classes.typo} variant='body2'>Liked By {postData.likes.length === 0 ? 'nobody' : ` others`}</Typography>
                                </div>
                                <AddComment userData={userData} postData={postData} />
                            </div>
                        </div>
                    </div>
                </MuiDialogContent>
            </Dialog>
        </div>
    )
}

export default ProfilePost

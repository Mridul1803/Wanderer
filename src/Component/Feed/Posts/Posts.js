import React, { useEffect, useState } from 'react'
import { database } from '../../../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Avatar } from '@material-ui/core';
import Video from './Video/Video';
import { makeStyles } from '@material-ui/core/styles';
import './Posts.css'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Likes from './Likes/Likes'
import AddComment from './AddComment/AddComment';
import Comments from './Comments/Comments';
const useStyles = makeStyles({
    root: {
        width: '100%',
        padding: '0px'
      },
      loader: {
        position: 'absolute',
        left: '50%',
        top: '50%'
      },
      typo: {
        marginLeft: '2%'
      },
      vac: {
        marginLeft: '3.5%',
        color: '#8e8e8e',
        cursor:'pointer'
      },
      dp: {
        marginLeft: '2%'
      },
      cc: {
        height: '50vh',
        overflowY: 'auto'
      },
      seeComments:{
        height:'54vh',
        overflowY:'auto'
      },
      ci:{
        bottom: '7%',
        right: '8%',
        color: 'white',
        cursor: 'pointer',
      },
      mn:{
        color:'white',
        
       
      },
      tmn:{
        color:'white'
      }
})

function Posts({userData}) {
    console.log(userData)

    const classes = useStyles();
    const [posts, setPosts] = useState(null);
    const [openId, setOpenId] = useState(null);
    const handleClickOpen = (id) => {
        setOpenId(id);
      };
      const handleClose = () => {
        setOpenId(null);
      };

    const callback = (entries) => {
        entries.forEach(element => {
            let el = element.target;
            el.play().then(() => {
                if (!element.isIntersecting) {
                    el.pause();
                }
            })
        });
    }
    const observer = new IntersectionObserver(callback, { threshold: 0.8 });

    useEffect(() => {
        let parr = [];
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
            parr = [];
            querySnapshot.forEach((doc) => {
                // console.log(doc.data(), doc.id);
                let data = { ...doc.data(), postId: doc.id };
                parr.push(data);
            })
            setPosts(parr);
        })
        return unsub;
    }, [])

    useEffect(() => {
        let elements = document.querySelectorAll('video');
        elements.forEach(el => {
            observer.observe(el);
        })

        return () => {
            observer.disconnect();
        }
    }, [posts]);

    return (
        <>
            {
                posts == null ? <CircularProgress className={classes.loader} color="secondary" /> :
                    <div className='video-container' id='video-container' >
                        {
                            posts.map((post, index) => {
                                return (
                                    <React.Fragment key={post.pId} >
                                        <div className='videos' >
                                            <Video source={post.pUrl} id={post.pId} />
                                            <div className='fa' style={{ display: 'flex' }}>
                                                <Avatar src={post.uProfile}></Avatar>
                                                <div className='fa-name'>{post.uName}</div>
                                            </div>
                                            
                                            <Likes userData = {userData} postData={post} />
                                            <ChatBubbleIcon onClick={() => handleClickOpen(post.pId)} className={`${classes.ci} icon-styling`} />
                                            <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId === post.pId}>
                                                <MuiDialogContent>
                                                    <div className='dcontainer'>
                                                        <div className='video-part'>
                                                            <video autoPlay={true} className='video-styles2' controls id={post.id} muted="muted" type="video/mp4" >
                                                                <source src={post.pUrl} type="video/webm" />
                                                            </video>
                                                        </div>
                                                        <div className='info-part'>
                                                            <Card>
                                                                <CardHeader
                                                                    avatar={
                                                                        <Avatar src={post?.uProfile} aria-label="recipe" className={classes.avatar}>
                                                                        </Avatar>
                                                                    }
                                                                    action={
                                                                        <IconButton aria-label="settings">
                                                                            <MoreVertIcon />
                                                                        </IconButton>
                                                                    }
                                                                    title={post?.uName}

                                                                />

                                                                <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
                                                                <CardContent className={classes.seeComments}>
                                                                    <Comments postData={post} userData={userData} />
                                                                </CardContent>

                                                            </Card>
                                                            <div className='extra'>
                                                                <div className='likes'>
                                                                    <Typography className={classes.typo} variant='body2'>Liked By {post.likes.length === 0 ? 'nobody' : ` others`}</Typography>
                                                                </div>
                                                                <AddComment userData={userData} postData={post} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </MuiDialogContent>
                                            </Dialog>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
            }
        </>
    )
}
export default Posts

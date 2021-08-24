import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import {v4 as uuidv4} from 'uuid'
import {storage, database} from '../../../firebase'
import './UploadFile.css';

const useStyles = makeStyles((theme) => ({
    btn:{
        background : 'linear-gradient(to right, #42275a, #673c8f)',
        color:'white'
    }
}));

function UploadFile(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const types = ['video/mp4', 'video/webm', 'video/ogg'];

    const onChange = (e)=>{
        const file = e?.target?.files[0];
        console.log(file);
        
        if(!file){
            setError("Select a file !");
            setTimeout( ()=>{ setError(null) }, 2000 )
            return;
        }

        if( types.indexOf(file.type) === -1 )
        {
            setError("Select a file !");
            setTimeout( ()=>{ setError(null) }, 2000 )
            return;
        }
        if( file.size/(1024*1024) > 100 )
        {
            setError("Size limit exceeded !");
            setTimeout( ()=>{ setError(null) }, 2000 )
            return;    
        }

        const id = uuidv4();
        const uploadTask = storage.ref( `/posts/${props.userData.userId}/${file.name}`).put(file);
        uploadTask.on('state_changed', fn1, fn2, fn3);
        function fn1( snapshot )
        {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setLoading(true);
        }
        function fn2( error)
        {
            setError(error);
            setTimeout( ()=>{
                setError();
            }, 2000 );
            setLoading(false);
        }
        function fn3()
        {
            uploadTask.snapshot.ref.getDownloadURL().then( url=>{
                let obj = {
                    comments:[],
                    likes:[],
                    pId:id,
                    pUrl : url,
                    uName : props?.userData?.username,
                    uProfile : props?.userData?.profileURL,
                    userId: props?.userData?.userId,
                    createdAt : database.getCurrentTimeStamp()
                }
                database.posts.add(obj).then( async docRef=>{
                    await database.users.doc(props.userData.userId).update({
                        postIds:[...props.userData.postIds, docRef.id]
                    })
                } ).then( ()=>{
                    setLoading(false);
                } ).catch( e=>{
                    setError(e);
                    setTimeout( ()=>{setError(null) }, 2000 )
                    setLoading(false);
                } )
            } )
        }
    }
    return (
        <>
            <div className='upload-btn-container' >
                <div className='upload-btn' >
                    {
                        error!=null ? <h1>Error - {error}</h1> : 
                        <>
                            <input
                                className={classes.input}
                                onChange={onChange}
                                id="icon-button-file"
                                type="file"
                                style={ {display:'none'} }
                            />
                            <label htmlFor="icon-button-file">
                                <Button variant="contained" className={classes.btn} disabled={loading} component="span">
                                Upload
                                </Button>
                            </label>
                            {loading?<LinearProgress color='secondary'  />:<></>}
                        </>
                    }    
                </div>
            </div>   
        </>
    )
}

export default UploadFile

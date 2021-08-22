import React from 'react'
import ReactDOM from 'react-dom';
import './Video.css';

function Video({source, id}) {
    const handleMute = (e)=>{
        e.preventDefault();
        e.target.muted = !e.target.muted;
    }
    const handleAutoScroll = (e)=>{
        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
        if(next)
        {
            next.scrollIntoView( {behaviour : 'smooth'} );
            e.target.muted = true;
        }
    }
    
    return (
        <>
        <video style={{height:'80vh' }} onEnded={handleAutoScroll} src={source} className='video-styles' id={id} muted='muted' type='video/mp4' onClick={handleMute}></video>
        </>
    )
}

export default Video

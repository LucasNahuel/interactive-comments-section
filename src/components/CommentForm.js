import data from '../data.json';
import { useState } from 'react';

function CommentForm(props){

    const [replyText, setReplyText] = useState(null)

    function sendReply(){

        let reply = {
            'content' : replyText,
            'createdAt' : 'just now',
            'score' : 0,
            'user': {
                "image": { 
                  "png": data.currentUser.image.png,
                  "webp": data.currentUser.image.webp
                },
            'username': data.currentUser.username
            }
            
        }
        props.saveReply(reply);
    }

    function changeText(ev){
        ev.preventDefault();
        setReplyText(ev.target.value)
    }

    return(
        <div className="reply-box">
            <img src={require(`${ data.currentUser.image.png }`)} />
            <form onSubmit={(ev)=>{ev.preventDefault(); sendReply()}}>
                <textarea rows={3} placeholder='Add a comment...' value={replyText} onChange={changeText} autoFocus={true} onFocus={() => setReplyText(props.replyingUser ? '@'+props.replyingUser+' ' : '' )}/>
                <button type='submit' className='reply-btn-filled'>REPLY</button>
            </form>
        </div>
    )
}

export default CommentForm;
import iconPlus from './images/icon-plus.svg';
import iconMinus from './images/icon-minus.svg';
import iconReply from './images/icon-reply.svg';
import CommentForm from './CommentForm';
import { useState } from 'react';

function Comment(props){

    const [replyBox, setReplyBox] = useState();
    const [replies, setReplies] = useState(props.comment.replies)

    function toggleReplyBox(replyingUser){
        
        setReplyBox(<CommentForm replyingUser={replyingUser} saveReply={saveReply}/>)
    }

    function saveReply(reply){

        let actualReplies = []

        if(replies){
            actualReplies = replies;
        }

        actualReplies.push(reply);
        
        console.log(actualReplies);
        setReplies(actualReplies);
        setReplyBox(null)
    }
    
    return(
        <div>

            
            <div className="comment">

                <div className="comment-votes">
                    <img src={iconPlus} />
                    <p className='score'>{props.comment.score}</p>
                    <img src={iconMinus}/>
                </div>
                <div className="comment-body">
                    <div className='comment-header'>
                        <img className='avatar-img' src={require(`${ props.comment.user.image.png }`)}></img>
                        <strong>{props.comment.user.username}</strong>
                        <p style={{'color': 'var(--grayish-blue)'}}>{props.comment.createdAt}</p>
                        <button className='reply-button' onClick={(e)=> {e.preventDefault() ;toggleReplyBox(props.comment.user.username);}}><img src={iconReply}/> Reply</button>
                    </div>
                    <p>{props.comment.content}</p>
                </div>
                

                
            </div>

            {replyBox}

            {replies && replies.length > 0 ? 
                
                
                
                <div className="replies-container">
                    
                    <div className="vl-container">
                        <div className="vl"/>
                    </div>

                    <div className="replies-list">
                    { 
                        
                        replies.map((comment) => <Comment comment={comment} key={replies.indexOf(comment)}></Comment>)
                        
                    }
                    </div>
                </div>
            : null
            }
        </div>
    )
}

export default Comment;
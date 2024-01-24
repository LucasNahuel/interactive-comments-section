import iconPlus from './images/icon-plus.svg';
import iconMinus from './images/icon-minus.svg';
import iconReply from './images/icon-reply.svg';
import CommentForm from './CommentForm';
import { useState } from 'react';

function Comment(props){

    const [commentBox, setCommentBox] = useState();

    function toggleCommentBox(ev){
        ev.preventDefault();
        setCommentBox(<CommentForm/>)
    }
    
    return(
        <div>

            
            <div className="comment">

                <div className="comment-votes">
                    <img src={iconPlus} />
                    <p>{props.comment.score}</p>
                    <img src={iconMinus}/>
                </div>
                <div className="comment-body">
                    <div className='comment-header'>
                        <img className='avatar-img' src={require(`${ props.comment.user.image.png }`)}></img>
                        <strong>{props.comment.user.username}</strong>
                        <p style={{'color': 'var(--grayish-blue)'}}>{props.comment.createdAt}</p>
                        <button className='reply-button' onClick={toggleCommentBox}><img src={iconReply}/> Reply</button>
                    </div>
                    <p>{props.comment.content}</p>
                </div>
                

                
            </div>

            {commentBox}

            {props.comment.replies && props.comment.replies.length > 0 ? 
                
                
                
                <div className="replies-container">
                    
                    <div className="vl-container">
                        <div className="vl"/>
                    </div>

                    <div className="replies-list">
                    { 
                        
                        props.comment.replies.map((comment) => <Comment comment={comment} key={props.comment.replies.indexOf(comment)}></Comment>)
                        
                    }
                    </div>
                </div>
            : null
            }
        </div>
    )
}

export default Comment;
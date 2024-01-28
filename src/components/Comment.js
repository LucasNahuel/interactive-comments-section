import iconPlus from './images/icon-plus.svg';
import iconMinus from './images/icon-minus.svg';
import iconReply from './images/icon-reply.svg';
import CommentForm from './CommentForm';
import { useState } from 'react';
import data from '../data.json';
import deleteIcon from './images/icon-delete.svg';
import editIcon from './images/icon-edit.svg';
import EditComment from './EditComment';

function Comment(props){

    const [replyBox, setReplyBox] = useState();
    const [replies, setReplies] = useState(props.comment.replies);
    const [editors, setEditors] = useState({});
    const [comment, setComment] = useState(props.comment);


    

    function toggleReplyBox(replyingUser){
        
        setReplyBox(<CommentForm replyingUser={replyingUser} saveReply={saveReply}/>)
    }

    function saveReply(reply){

        let actualReplies = []

        if(replies){
            actualReplies = [...replies];
        }

        actualReplies.push(reply);
        
        console.log(actualReplies);
        setReplies(actualReplies);
        setReplyBox(null);
    }

    function displayComment(comment){

        let elementsArray = [];

        let sentence = "";

        comment.split(' ').forEach((word) =>{
            if (word.startsWith('@')){
                elementsArray.push(<p style={{'display': 'inline'}}>{sentence}</p>);
                sentence = "";
                elementsArray.push(<p style={{'font-weight': '600', 'color': 'var(--moderate-blue)', 'display': 'inline'}}>{word}</p>);
            }else{
                sentence += ' '+word;
            }
        });


        elementsArray.push(<p style={{'display': 'inline'}}>{sentence}</p>);

        return elementsArray;

    }

    function addEditor(comment){
        editors[comment] = <EditComment saveEdition={saveEdition} comment={comment}/>;

        let newEditors = {...editors};
        setEditors(newEditors);

    }

    function saveEdition(comment){
       console.log(comment);
       setComment(comment);
        setEditors({});
    }

    
    
    return(
        <div>

            
            <div className="comment">

                <div className="comment-votes">
                    <img src={iconPlus} />
                    <p className='score'>{comment.score}</p>
                    <img src={iconMinus}/>
                </div>
                <div className="comment-body">
                    <div className='comment-header'>
                        <img className='avatar-img' src={require(`${ comment.user.image.png }`)}></img>
                        <strong>{comment.user.username}</strong>
                        {comment.user.username == data.currentUser.username ? <p className='you-badge'>you</p> : null}
                        <p style={{'color': 'var(--grayish-blue)'}}>{comment.createdAt}</p>

                        {comment.user.username == data.currentUser.username ?  
                        
                            <div className='own-comment-actions'>
                                <button className='delete-btn'> <img src={deleteIcon}/> Delete</button>
                                <button className='edit-btn' onClick={(ev) => {ev.preventDefault(); addEditor(comment)}}> <img src={editIcon}/> Edit</button>
                            </div>

                            :
                            
                            <button className='reply-button' onClick={(e)=> {e.preventDefault() ;toggleReplyBox(comment.user.username);}}><img src={iconReply}/> Reply</button>

                        }
                    </div>

                    {editors[comment] ? 
                    
                        editors[comment]

                        :

                        <div style={{'text-align': 'left', 'margin-block': '1em'}}>{displayComment(comment.content)}</div>

                    }
                    
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
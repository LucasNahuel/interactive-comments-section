import iconPlus from './images/icon-plus.svg';
import iconMinus from './images/icon-minus.svg';
import iconReply from './images/icon-reply.svg';
import CommentForm from './CommentForm';
import { useState } from 'react';
import data from '../data.json';
import deleteIcon from './images/icon-delete.svg';
import editIcon from './images/icon-edit.svg';
import EditComment from './EditComment';
import ModalDialog from './ModalDialog';
function Comment(props){

    const [replyBox, setReplyBox] = useState();
    const [replies, setReplies] = useState(props.comment.replies);
    const [editors, setEditors] = useState({});
    const [comment, setComment] = useState(props.comment);
    const [deleteConfirmation, setDeleteConfirmation] = useState();

    

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

    function deleteReply(reply){

        let repliesFiltered = replies.filter((comment) => comment !== reply);

        console.log(repliesFiltered);

        setReplies(repliesFiltered);
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
       setComment(comment);
        setEditors({});
    }


    function openDeleteDialog(){
        setDeleteConfirmation(<ModalDialog confirmDelete={deleteComment} ></ModalDialog>);
    }

    function deleteComment(){
        setDeleteConfirmation(null);
        
        setComment(null);
    }

    function upvote(){

        let upvotedComment = {...comment};
        upvotedComment.score = props.comment.score+1;
        setComment(upvotedComment);

    }

    function downvote(){
        let downvotedComment = {...comment};
        downvotedComment.score = props.comment.score-1;
        setComment(downvotedComment);
    }

    
    
    return(
        <div>
            {deleteConfirmation}

            {
                comment ?
            <div className="comment">

                <div className="comment-votes">
                    <button className='vote-button' onClick={(ev)=>{ev.preventDefault(); upvote()}}><img src={iconPlus} /></button>
                    <p className='score'>{comment.score}</p>
                    <button className='vote-button' onClick={(ev)=>{ev.preventDefault(); downvote()}}><img src={iconMinus}/></button>
                </div>
                <div className="comment-body">
                    <div className='comment-header'>
                        <img className='avatar-img' src={require(`${ comment.user.image.png }`)}></img>
                        <strong>{comment.user.username}</strong>
                        {comment.user.username == data.currentUser.username ? <p className='you-badge'>you</p> : null}
                        <p style={{'color': 'var(--grayish-blue)'}}>{comment.createdAt}</p>

                        {comment.user.username == data.currentUser.username ?  
                        
                            <div className='own-comment-actions'>
                                <button className='delete-btn' onClick={(ev) => {ev.preventDefault(); openDeleteDialog()}}> <img src={deleteIcon}/> Delete</button>
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
                

                
            </div> : null
            }
            {replyBox}

            {replies && replies.length > 0 ? 
                
                
                
                <div className="replies-container">
                    
                    <div className="vl-container">
                        <div className="vl"/>
                    </div>

                    <div className="replies-list">
                    { 
                        
                        replies.map((comment) => <Comment comment={comment} key={replies.indexOf(comment)} delete={deleteReply}></Comment>)
                        
                    }
                    </div>
                </div>
            : null
            }

            
        </div>
    )
}

export default Comment;
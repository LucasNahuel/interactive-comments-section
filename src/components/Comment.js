function Comment(props){

    

    return(
        <div className="comment">
            <p>{props.comment.content}</p>
        </div>
    )
}

export default Comment;
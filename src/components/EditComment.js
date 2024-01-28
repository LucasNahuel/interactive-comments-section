import { useState } from "react";

function EditComment(props){

    const [content, setContent] = useState(props.comment.content);
    

    function handleChange(ev){
        ev.preventDefault();

        if(ev.target.scrollHeight > ev.target.clientHeight){
            
            ev.target.setAttribute("style", ev.target.getAttribute("style")+"height:"+ev.target.scrollHeight+"px;");
        }


        setContent(ev.target.value);

    }

    function sendEditedComment(ev){
        ev.preventDefault();
        let newComment = props.comment;
        newComment.content = content;
        props.saveEdition({...newComment});
    }



    return(
        <form>
            <textarea style={{'margin-block': '1em'}} autoFocus={true} value={content} onChange={(ev) => handleChange(ev)} onFocus={(ev)=> handleChange(ev)}></textarea>
            <button style={{'float': 'right'}} className="reply-btn-filled" onClick={(ev)=> {sendEditedComment(ev)}}>UPDATE</button>
        </form>
    )
}

export default EditComment;
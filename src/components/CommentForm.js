import data from '../data.json'

function CommentForm(props){



    return(
        <div className="reply-box">
            <img src={require(`${ data.currentUser.image.png }`)} />
            <form>
                <textarea rows={3} />
                <button type='submit' className='reply-btn-filled'>REPLY</button>
            </form>
        </div>
    )
}

export default CommentForm;
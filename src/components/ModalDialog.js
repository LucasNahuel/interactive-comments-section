

function ModalDialog(props){

    function confirm(ev){
        ev.preventDefault();
        props.confirmDelete();
    }

    return(
        <div className="modal-overlay">
            <div className="modal-card">
                <h2>Delete comment</h2>
                <p>
                    Are you sure you want to delete this comment? This will remove the comment and can't be undone.
                </p>

                <div className="modal-card-actions">
                    <button className="cancel-button">NO, CANCEL</button>
                    <button className="confirm-button" onClick={(ev) => {confirm(ev)}}>YES, DELETE</button>
                </div>
            </div>
        </div>
    )
}


export default ModalDialog;
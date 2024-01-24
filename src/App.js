import logo from './logo.svg';
import './App.css';
import data from './data.json'
import { useState } from 'react';
import Comment from './components/Comment.js'
import { ReactDOM } from 'react';
import CommentBox from './components/CommentForm.js'

function App() {

  const [commentsData, setData] = useState( data.comments )

  return (
    <div className="App">
      <div className="Comments-list">
        {
          commentsData.map((comment) => <Comment comment={comment} key={commentsData.indexOf(comment)} ></Comment>)
        }
        <CommentBox></CommentBox>
      </div>
    </div>
  );
}

export default App;

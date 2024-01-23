import logo from './logo.svg';
import './App.css';
import data from './data.json'
import { useState } from 'react';
import Comment from './components/Comment.js'
import { ReactDOM } from 'react';

function App() {

  const [commentsData, setData] = useState( data.comments )

  return (
    <div className="App">
      <div className="Comments-list">
        {
          commentsData.map((comment) => <Comment comment={comment} key={commentsData.indexOf(comment)} ></Comment>)
        }
      </div>
    </div>
  );
}

export default App;

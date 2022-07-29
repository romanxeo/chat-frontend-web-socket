import React, {useState} from 'react';
import './App.module.css';

function App() {

  const [messagesList, setMessagesList] = useState([
    {message: "Hello", id: 1, user: {id: 3, name: "Roman"}},
    {message: "Buy", id: 2, user: {id: 4, name: "Vasya"}}
  ])

  return (
    <div className="App">
      <div>Init</div>
    </div>
  );
}

export default App;

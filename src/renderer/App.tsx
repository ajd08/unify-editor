import React, { useState } from 'react';
import Editor from './Editor';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
      <Editor/>
      </header>
    </div>
  );
};

export default App;

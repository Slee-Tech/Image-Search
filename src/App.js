import React from 'react';
import NavBar from './components/NavBar';
import Search from './components/Search';

import './App.css';

function App(props) {

  return (
    <div className="container mb-5">
      <NavBar />
      <Search />
    </div>
  );
}

export default App;

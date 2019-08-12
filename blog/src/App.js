import React from 'react';
//import logo from './logo.svg';
import './App.css';
//import Blog from './components/blog'
import BlogPost from './components/blog';

function App() {
  //let New_post = new Blog_post('', '');
  //ReactDOM.render(
    //<Blog_post />,Mihoy min yoy
    //document.getElementById('root')
  //);
  return (
    //New_post.render()
    <div className="App">
      <BlogPost />
    </div>
  );
}
    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */


export default App;

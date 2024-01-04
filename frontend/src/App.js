import './App.css';
import Header from './components/Header';
import Blog from './components/Blog';
import Footer from './components/Footer';
import Makepost from './components/Makepost';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  const blogPosts = [
    {
      id: 1,
      title: 'Introduction to React',
      content: `React, developed by Facebook, is a powerful JavaScript library designed for building user interfaces. It simplifies the process of creating interactive and dynamic UIs, making it a popular choice for web development. To begin working with React, a basic understanding of HTML, CSS, and JavaScript is recommended. Tools like Create React App can be used to quickly set up a React project, handling configuration details automatically. In subsequent articles, we'll delve deeper into React concepts, explore advanced features, and guide you through practical applications. Stay tuned for an exciting journey into the world of React development!`,
      
    },
    
  ];
 
  
  return (
    <>
      <Header title="</>Dev Diary" ></Header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog' element={<Blog posts={blogPosts}/>}/>
        <Route path='/makepost' element={<Makepost/>}/>


      </Routes> 
      
      <Footer></Footer>
      
    </>
  );
}

export default App;

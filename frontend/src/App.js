import './App.css';
import Header from './components/Header';
import Blog from './components/Blog';
import Footer from './components/Footer';
import ContactUs from './components/Contact';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  const blogPosts = [
    {
      id: 1,
      title: 'Introduction to React',
      content: `React, developed by Facebook, is a powerful JavaScript library designed for building user interfaces. It simplifies the process of creating interactive and dynamic UIs, making it a popular choice for web development. To begin working with React, a basic understanding of HTML, CSS, and JavaScript is recommended. Tools like Create React App can be used to quickly set up a React project, handling configuration details automatically. In subsequent articles, we'll delve deeper into React concepts, explore advanced features, and guide you through practical applications. Stay tuned for an exciting journey into the world of React development!`,
      
    },
    {
      id: 2,
      title: 'State Management in React',
      content: `When it comes to building dynamic and interactive web applications with React, understanding and effectively managing state is crucial. React's component-based architecture empowers developers to create reusable UI elements, but it also introduces the challenge of handling and updating application state.In React, state represents the data that a component needs to keep track of and render dynamically. It could be user input, the result of an API call, or any other piece of data that changes during the lifetime of the application.`,
      
    },
    {
      id: 3,
      title: 'State Management in React',
      content: `When diving into React development, one concept that often causes both excitement and confusion is state management. Understanding how to effectively handle state is key to building robust and responsive applications. In this blog post, we'll unravel the mysteries of state management in React. In React, state is the heartbeat of your application. It represents the dynamic data that can change over time, influencing how your components render and behave. Whether it's user input, data from an API, or the outcome of a specific action, React components use state to stay in sync with the evolving nature of your app.`,
     
    },
    
  ];
 
  
  return (
    <>
      <Header title="</>Dev Diary" ></Header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog' element={<Blog posts={blogPosts}/>}/>
        <Route path='/contact' element={<ContactUs/>}/>


      </Routes> 
      
      <Footer></Footer>
      
    </>
  );
}

export default App;

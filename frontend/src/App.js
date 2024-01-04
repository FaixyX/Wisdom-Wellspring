import './App.css';
import Header from './components/Header';
import Blog from './components/Blog';
import Footer from './components/Footer';
import Makepost from './components/Makepost';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
 
  return (
    <>
      <Header title="Wisdom Wellspring" ></Header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/makepost' element={<Makepost/>}/>
      </Routes> 
      <Footer></Footer>
    </>
  );
}

export default App;

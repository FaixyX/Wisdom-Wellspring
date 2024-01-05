import './App.css';
import Header from './components/Header';
import Blog from './pages/Blog';
import Footer from './components/Footer';
import Makepost from './pages/Makepost';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
 
  return (
    <>
      <Header title="Wisdom Wellspring" ></Header>
      <Routes>
        <Route path='/' element={<Blog/>}/>
        <Route path='/myblog' element={<Home/>}/>
        <Route path='/makepost' element={<Makepost/>}/>
      </Routes> 
      <Footer></Footer>
    </>
  );
}

export default App;

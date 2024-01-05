import './App.css';
import Header from './components/Header';
import Blog from './pages/Blog';
import Footer from './components/Footer';
import Makepost from './pages/Makepost';
import Home from './pages/Home';
import Login from './pages/login'
import Signup from './pages/signup'
import { Route, Routes } from 'react-router-dom';

function App() {
 
  return (
    <div className="main-content">
      <Header title="Wisdom Wellspring" ></Header>
      <Routes>
        <Route path='/' element={<Blog/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/myblog' element={<Home/>}/>
        <Route path='/makepost' element={<Makepost/>}/>
      </Routes> 
      <Footer></Footer>
    </div>
  );
}

export default App;

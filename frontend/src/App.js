import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Makepost from './pages/Makepost';
import Login from './pages/login'
import Signup from './pages/signup'
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext.js';
import MyBlogs from './pages/MyBlogs.js';
import Home from './pages/Home.js';


function App() {

  const { user } = useAuthContext()
 
  return (
    <div className="main-content">
      <Header title="Wisdom Wellspring" ></Header>
      <Routes>
        <Route path='/' element={user ? <Home/>: <Navigate to = '/login'/>}/>
        <Route path='/login' element={!user ? <Login />: <Navigate to = '/'/>}/>
        <Route path='/signup' element={!user ? <Signup />: <Navigate to = '/'/>}/>
        <Route path='/myblog' element={user ? <MyBlogs />: <Navigate to = '/login'/>}/>
        <Route path='/makepost' element={user ? <Makepost/>: <Navigate to = '/login'/>}/>
      </Routes> 
      <Footer></Footer>
    </div>
  );
}

export default App;

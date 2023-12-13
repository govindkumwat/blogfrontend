import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import '@mantine/tiptap/styles.css';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Description from './pages/Description';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUpPage';


function App() {
  return (
   <>
   <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/about' element={<About/>}/>
     <Route path='/:id' element={<Description/>}/>
     <Route path='/login' element={<LoginPage/>}/>
     <Route path = '/signup' element={<SignUpPage/>}/>
   </Routes>
  
   </>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import '@mantine/tiptap/styles.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import About from './pages/About';
import Description from './pages/Description';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUpPage';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';



function App() {
  const isAuthenticated = localStorage.getItem('token')
  const Navigate = useNavigate()
  return (
   <>
   <Navbar/>
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path='/dashboard' element={<AdminDashboard/>}/>
      {/* Dynamic route with parameter */}
      <Route path="/:id" element={<Description />} />

      {/* Catch-all route for 404 */}
      <Route path="*" element={<About />} />
    </Routes>
    <Toaster/>
   
  
   </>
  );
}

export default App;

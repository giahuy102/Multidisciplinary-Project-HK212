import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

import Dashboard from './pages/Dashboard/index';
import Login from './pages/Login/index';
import Signup from './pages/Signup/index';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="*" element={ <Dashboard /> } />        
  
      </Routes>
    </Router>

    // <div>

    //     <Dashboard />
      
    // </div>
  );
}

export default App;

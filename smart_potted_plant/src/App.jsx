import 'bootstrap/dist/css/bootstrap.min.css';
import react from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

import Dashboard from './pages/Dashboard/index';
import Login from './pages/Login/index';
import Register from './pages/Register/index';


import AuthService from './services/AuthService';
// import JWTStorage from '../../services/JWTStorage';
// import { loadToken } from './services/JWTStorage'

class App extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: AuthService.getUser()
    }
    
  }

   

  render = () => (
    <Router>
      <Routes>
        <Route path="/login" element={!this.state.user ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/register" element={!this.state.user ? <Register /> : <Navigate to="/" replace />} />
        {/* <Route path="/home/" element={<Navigate to="/home/control-panel" replace />} /> */}
        <Route path="*" element={this.state.user ? <Dashboard /> : <Navigate to="/login" replace />} />

        {/* <Route path="*" element={<Dashboard />}/> */}

        {/* <Route path="*" element={<Navigate to="/home/control-panel" replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

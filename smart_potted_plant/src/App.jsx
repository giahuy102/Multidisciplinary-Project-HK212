import 'bootstrap/dist/css/bootstrap.min.css';
import react from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

import Dashboard from './pages/Dashboard/index';
import Login from './pages/Login/index';
import Register from './pages/Register/index';

class App extends react.Component {
  constructor(props) {
    super(props);
  }
  render = () => (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

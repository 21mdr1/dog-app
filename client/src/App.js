import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Walk from './pages/Walk/Walk';
import User from './pages/User/User';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { useState } from 'react';
import { userIsSignedIn } from './utils/userUtils';
import './App.scss';

function App() {
  let [ signedIn, setSignedIn ] = useState(userIsSignedIn());

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home signedIn={signedIn} />} />
        <Route path='/walk' element={<Walk signedIn={signedIn} />} />
        <Route path='/user' element={<User signedIn={signedIn} />} />
        <Route path='/login' element={<Login setSignedIn={setSignedIn} />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

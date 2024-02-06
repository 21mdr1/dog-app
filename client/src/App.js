import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Walk from './pages/Walk/Walk';
import User from './pages/User/User';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';
import EntryForm from './components/EntryForm/EntryForm';
import { getPreferences } from './utils/storageUtils';
import { useEffect, useState } from 'react';
import { userIsSignedIn } from './utils/userUtils';
import './App.scss';

function App() {
  let [ signedIn, setSignedIn ] = useState(userIsSignedIn());
  let [ needPreferences, setNeedPreferences ] = useState(false);

  useEffect(() => {
    getPreferences(signedIn, (data) => {setNeedPreferences(data === null)})
  }, [signedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home signedIn={signedIn} />} />
        <Route path='/walk' element={<Walk signedIn={signedIn} />} />
        <Route path='/user' element={<User signedIn={signedIn} />} />
        <Route path='/login' element={signedIn ? <Navigate to='/' /> : <Login setSignedIn={setSignedIn} />} />
        <Route path='/register' element={signedIn ? <Navigate to='/' /> : <Register setSignedIn={setSignedIn} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {needPreferences && <EntryForm setNeedPreferences={setNeedPreferences} signedIn={signedIn} />}
    </BrowserRouter>
  );
}

export default App;

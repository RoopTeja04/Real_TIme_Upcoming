import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import User from './Pages/User';
import Mentor from './Pages/Mentor';
import Instructor from './Pages/Instructor';
import Admin from './Pages/Admin';
import ForgotPassWord from './Components/ForgotPassWord';
import Account from './DashBoards/AdminDashboard/Account';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login/forgot-password' element={<ForgotPassWord />} />
        <Route path='/user' element={<User />} />
        <Route path='/mentor' element={<Mentor />} />
        <Route path='/instructor' element={<Instructor />} />
        <Route path='/admin' element={<Admin />} >
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
import { useState } from 'react'
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Auth } from './pages/auth/index'
import './App.css'
import { ExpenseTracker } from './pages/expense_track'

function App() {
const Auth = lazy(() => import('./components/Auth'));
const ExpenseTracker = lazy(() => import('./components/ExpenseTracker'));

  return (
    <div className='App'>
      <Router>
        <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path='/' exact element={<Auth/>}/>
          <Route path='/expense-tracker' element={<ExpenseTracker />}/>
        </Routes>
        </Suspense>
      </Router>
    </div>
  )
}

export default App;

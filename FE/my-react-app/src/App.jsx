import { Children } from 'react'

import './App.css'
import { UserContext } from './components/UserContext/UserContext'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Users from './pages/Users/Users'
import Navbar from './components/Navbar/Navbar'
import AddUser from './pages/AddUser/AddUser'
import Footer from './components/Footer/Footer'
import Dashboard from './components/Dashboard/Dashboard'
import Sidebar from './components/Sidebar/Sidebar'
import CostExplorer from './pages/CostExplorer/CostExplorer'
import UserManagement from './pages/UserManagement/UserManagement'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Login/> } />
          <Route path='/login' element={ <Login/> } />
          <Route path='/users' element={ <Users/> } />
          {/* <Route path='/dashboard' element={<Dashboard/>} /> */}
          <Route path='/dashboard' element={<Dashboard/>}>
            <Route index element={<div>Welcome to CloudBalance</div>} />
            <Route path='cost-explorer' element={ <CostExplorer/> }/>
            <Route path='user-management' element={ <UserManagement/> }/>
          </Route>


          {/* ---Testing---- */}
          {/* <Route path='/nav' element={<Navbar/>}/>
          <Route path='/add' element={<AddUser/>}/>
          <Route path='/footer' element={<Footer/>}/> */}
          


          <Route path='*' element={<div>404 Not Found Page</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

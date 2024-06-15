import { Routes, Route } from 'react-router-dom'
import './App.css'
// import pages
import SideBar from './components/SideBar/SideBar'
import Brands_page from './pages/Brands_page'
import Cars_page from './pages/Cars_page'
import Categories_page from './pages/Categories_page'
import Cities_page from './pages/Cities_page'
import Locations_page from './pages/Locations_page'
import Models_page from './pages/Models_page'
import Login_page from './pages/Login_page'

// Toastify link
import { ToastContainer} from 'react-toastify';


function App() {

  return (
    <>
    {/* {
      localStorage.getItem("accessToken") ?  <SideBar /> : ""
    } */}
      <Routes path='/'  element={<Login_page/>}>
        <Route  index element={<Login_page/>}/>
        <Route path='home' element={<SideBar /> }>
          <Route path='categories' element={<Categories_page/>}/>
          <Route path='brands' element={  <Brands_page/>}/>
          <Route path='cities' element={ <Cities_page/>}/>
          <Route path='locations' element={<Locations_page/>}/>
          <Route path='cars' element={ <Cars_page/>}/>
          <Route path='models' element={<Models_page/>}/>
        </Route>
      </Routes>
      <ToastContainer/>
  </>

  )
}

export default App

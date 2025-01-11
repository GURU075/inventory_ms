import { element } from 'prop-types';
import './App.css';
import Asset from './pages/Asset';
import Category from './pages/Category';
import Designation from './pages/Designation';
import RolePage from './pages/role';
import User from './pages/User';
// +import { Routes } from "react-router"
import { createBrowserRouter, RouterProvider } from 'react-router';
import Sidebar from './components/Sidebar';
// import Vendor from './pages/Vendor';

const router = createBrowserRouter(
  [
    {
      path:"/",
      element: <Sidebar/>,
     },
   {
    path:"/Asset",
    element: 
    <div>
    <Sidebar/>
    <Asset/>
      </div>,
   },
   {
    path:"/Category",
    element: 
    <div>
       <Sidebar/>
      <Category />
    </div>,
   },
   {
    path:"/Designation",
    element: 
    <div>
    <Sidebar/>
    <Designation/>,
      </div>,
   },
   {
    path:"/User",
    element: 
    <div>
    <Sidebar/>
    <User/>,
      </div>,
   },
   {
    path:"/RolePage",
    element: 
    <div>
    <Sidebar/>
    <User/>,
      </div>,
   }

  ]

);

function App() {
  return (
    <div className="App">
      {/* <RolePage /> */}
      {/* <Designation /> */}
      {/* <User /> */}
      {/* <Category /> */}
      {/* <Asset /> */}
      {/* <Vendor /> */}
      <RouterProvider router = {router} />
    </div>
  );
}

export default App;

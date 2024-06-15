import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useState } from "react";
import { TextIndent, Timer, BuildingOffice, MapPin, Car, WindowsLogo, ListBullets } from "@phosphor-icons/react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SideBar = () => {
   const [open, setOpen] = useState(true);
   const navigate = useNavigate()
//    const (id) = useParams
   
   const logOutButton = () => {
    localStorage.removeItem("accessToken")
    navigate("/")
    toast.success("Log out qildingiz")
   }
  return (
     
     <div className="flex bg-gray-300 h-screen w-screen ">
      <div
        className={` ${
          open ? "w-2/12" : "w-20 "
        } bg-blue-950  p-5 duration-300 h-full `}
      >
        <div className="fixed top-0 pt-6">
        {
          open ? <h1 className="font-[700] text-white text-xl ">AutoZoom Admin</h1> : <h1 className="text-white font-[700]">Auto</h1>
         } 
        <ul className="pt-6 ">
            <li className={`flex  rounded-xl p-2 cursor-pointer text-sm font-[700] hover:font-[800] items-center gap-x-2 text-white hover:bg-blue-600`}>
              <p><TextIndent size={15} /></p>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                <NavLink to={"categories"}>
                    Categories
                </NavLink>
              </span>
            </li>

            <li className={`flex  rounded-md p-2 cursor-pointer text-sm font-[700] hover:font-[800] items-center gap-x-2 text-white hover:bg-blue-600 `}>
              <p><Timer size={15} /></p>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                <NavLink to={"brands"}>
                    Brands
                </NavLink>
              </span>
            </li>

            <li className={`flex  rounded-md p-2 cursor-pointer text-sm font-[700] hover:font-[800] items-center gap-x-2 text-white  hover:bg-blue-600`}>
              <p><BuildingOffice size={15} /></p>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                <NavLink to={"cities"}>
                    Cities
                </NavLink>
              </span>
            </li>

            <li className={`flex  rounded-md p-2 cursor-pointer text-sm font-[700] hover:font-[800] items-center gap-x-2 text-white hover:bg-blue-600`}>
              <p><MapPin size={15} /></p>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                <NavLink to={"locations"}>
                    Locations
                </NavLink>
              </span>
            </li>

            <li className={`flex  rounded-md p-2 cursor-pointer text-sm font-[700] hover:font-[800] items-center gap-x-2 text-white hover:bg-blue-600`}>
              <p><Car size={15} /></p>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                <NavLink to={"cars"}>
                    Cars
                </NavLink>
              </span>
            </li>

            <li className={`flex  rounded-md p-2 cursor-pointer text-sm font-[700] hover:font-[800] items-center gap-x-2 text-white hover:bg-blue-600 `}>
              <p><WindowsLogo size={15} /></p>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                <NavLink to={"models"}>
                    Models
                </NavLink>
              </span>
            </li>
        </ul>
        </div>
      </div>

        <div className="flex flex-col pb-5 w-full  overflow-y-scroll ">
            <div className={`flex justify-between z-20 ${ open ? "pr-72" : "pr-40"} pl-10 py-5  bg-white fixed top-0 w-full`}>
                <button type="button" onClick={() => setOpen(!open)}><ListBullets size={25} /></button>
                <button type="button" className="border border-gray-500 px-2 py-0.5 rounded-md" onClick={logOutButton}>Log out</button>
            </div>
            <div className="bg-white z-1 rounded-md px-3 py-3 mx-5 mt-20 mb-20  ">
              <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default SideBar
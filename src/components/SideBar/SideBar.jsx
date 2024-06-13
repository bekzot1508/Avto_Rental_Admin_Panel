import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom"
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
     
     <div className="flex bg-gray-300 h-screen">
      <div
        className={` ${
          open ? "w-48" : "w-20 "
        } bg-blue-950 h-screen p-5 relative duration-300`}
      >

        <ul className="pt-6">
            <li className={`flex  rounded-xl p-2 cursor-pointer text-sm items-center gap-x-2 text-white hover:bg-blue-600`}>
              <p><TextIndent size={15} /></p>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                <NavLink to={"categories"}>
                    Categories
                </NavLink>
              </span>
            </li>

            <li className={`flex  rounded-md p-2 cursor-pointer text-sm items-center gap-x-2 text-white hover:bg-blue-600 `}>
              <p><Timer size={15} /></p>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                <NavLink to={"brands"}>
                    Brands
                </NavLink>
              </span>
            </li>

            <li className={`flex  rounded-md p-2 cursor-pointer text-sm items-center gap-x-2 text-white  hover:bg-blue-600`}>
              <p><BuildingOffice size={15} /></p>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                <NavLink to={"cities"}>
                    Cities
                </NavLink>
              </span>
            </li>

            <li className={`flex  rounded-md p-2 cursor-pointer text-sm items-center gap-x-2 text-white hover:bg-blue-600`}>
              <p><MapPin size={15} /></p>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                <NavLink to={"locations"}>
                    Locations
                </NavLink>
              </span>
            </li>

            <li className={`flex  rounded-md p-2 cursor-pointer text-sm items-center gap-x-2 text-white hover:bg-blue-600`}>
              <p><Car size={15} /></p>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                <NavLink to={"cars"}>
                    Cars
                </NavLink>
              </span>
            </li>

            <li className={`flex  rounded-md p-2 cursor-pointer text-sm items-center gap-x-2 text-white hover:bg-blue-600 `}>
              <p><WindowsLogo size={15} /></p>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                <NavLink to={"models"}>
                    Models
                </NavLink>
              </span>
            </li>
   
        </ul>
      </div>

        <div className="flex flex-col pb-5 w-full">
            <div className="flex justify-between pr-20 pl-10 py-5 mb-5 bg-white ">
                <button type="button" onClick={() => setOpen(!open)}><ListBullets size={25} /></button>
                <button type="button" className="border border-gray-500 px-2 py-0.5 rounded-md" onClick={logOutButton}>Log out</button>
            </div>
            <div className="bg-white rounded-md h-full px-5 py-8 mx-5">
              <Outlet />
            </div> 
        </div>
    </div>

        
        /* <div className="grid grid-cols-1 gap-5 bg-blue-400 w-[300px]">
            <NavLink to={"categories"}>
                Categories
            </NavLink>
            <NavLink to={"brands"}>
                Brands
            </NavLink>
            <NavLink to={"cities"}>
                Cities
            </NavLink>
            <NavLink to={"locations"}>
                Locations
            </NavLink>
            <NavLink to={"cars"}>
                Cars
            </NavLink>
            <NavLink to={"models"}>
            Models
            </NavLink>
        </div>
         <div>
            <div>
                <p>navbar</p>
            </div>
           <Outlet/>  
         </div> */
  )
}

export default SideBar
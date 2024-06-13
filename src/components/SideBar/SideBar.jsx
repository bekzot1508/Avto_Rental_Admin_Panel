import { NavLink } from "react-router-dom"

 

const SideBar = () => {
  return (
    <div>
        <div className="grid grid-cols-1 gap-5 bg-blue-400">
            <NavLink to={"/categories"}>
                Categories
            </NavLink>
            <NavLink to={"/brands"}>
                Brands
            </NavLink>
            <NavLink to={"/cities"}>
                Cities
            </NavLink>
            <NavLink to={"/locations"}>
                Locations
            </NavLink>
            <NavLink to={"/cars"}>
                Cars
            </NavLink>
            <NavLink to={"/models"}>
            Models
            </NavLink>
        </div>
    </div>
  )
}

export default SideBar
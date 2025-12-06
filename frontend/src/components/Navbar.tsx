import { Link } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, Menu, MenuIcon, SigmaSquareIcon, X } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { logout } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGeneralStore } from "../store/useGeneralStore";
const Navbar = () => {
  const {sidebar, setSidebar} = useGeneralStore();
  const queryClient = useQueryClient();
 
  
  return (
    <div className="fixed z-20 w-full bg-base-300 flex justify-between items-center py-3 px-2 sm:px-20 xl:px-32">
      <div>
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <SigmaSquareIcon size={32} className="text-primary shrink-0" />
          <h1 className="text-2xl font-bold text-primary">Whispr</h1>
        </Link>
      </div>

      {/* Right Side Icons Group */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications Icon */}
        <Link to={"/notifications"}>
          <button 
            className="btn btn-ghost btn-circle hover:bg-primary/10 hover:text-primary transition-all duration-200 relative group"
            aria-label="Notifications"
          >
            <BellIcon className="h-6 w-6" />
            {/* Optional notification badge */}
         
          </button>
        </Link>

        {/* Theme Selector */}
        <div className="px-1">
          <ThemeSelector />
        </div>

      
        {/* Sidebar Toggle for small screens */}
        {!sidebar ? 
        <MenuIcon className='w-6 h-6 text-white sm:hidden' onClick={() =>setSidebar(!sidebar)}/>: 
         <X className='w-6 h-6 text-white sm:hidden' onClick={() =>setSidebar(!sidebar)}/>
         }

      </div>
      
    </div>
  );
};

export default Navbar;

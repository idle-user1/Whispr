import { Home, MessageSquare, Bell, SigmaSquareIcon, LogOutIcon } from "lucide-react";
import { Link, NavLink } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useGeneralStore } from "../store/useGeneralStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";

const Sidebar = () => {
  const queryClient = useQueryClient();
  
 const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
     });
  const { authData } = useAuthUser();
  const user = authData.user;
  const { sidebar } = useGeneralStore();
  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/friends", icon: MessageSquare, label: "Friends" },
    { path: "/notifications", icon: Bell, label: "Notifications" },
  ];

  return (
    <aside
      className={`w-64 bg-base-300 fixed top-[60px] h-[calc(100vh-60px)]
     flex flex-col border-base-100 border-r-2  ${
       sidebar ? "translate-x-0" : "max-sm:-translate-x-full "
     } transition-all duration-300 ease-in-out text-white`}
    >
      {/* Navigation Links */}
      <nav className="flex-1 space-y-3 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 relative ${
                  isActive
                    ? "bg-primary text-primary-content shadow-md"
                    : "text-base-content hover:bg-base-200"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-focus rounded-r-lg"></div>
                  )}
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
      {/* User Profile Section */}
      <div className="p-4 border-t border-base-200 bg-base-200 rounded-t-lg">

        <div className="flex justify-between">

          <div className="flex items-center gap-3">
            <div className="avatar placeholder">
              <div className="w-12 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <img
                  src={user.profilePic}
                  alt="avatar"
                  className="w-12 rounded-full"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">
                {user.fullName}
              </h3>
              <p className="text-xs text-success flex items-center gap-1">
                <span className="w-2 h-2 bg-success rounded-full"></span>
                Online
              </p>
            </div>
          </div>

            {/* Logout Icon */}
        <button 
          className="btn btn-ghost btn-circle hover:bg-error/10 hover:text-error transition-all duration-200"
          onClick={logoutMutation}
          aria-label="Logout"
        >
          <LogOutIcon className="h-6 w-6" />
        </button>

        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

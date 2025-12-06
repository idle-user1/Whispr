import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="flex flex-col h-screen ">
           
      {/* Main content area */}
      
       
         <Navbar />
      <Sidebar />  
      
        
  
        <main className="flex-1 overflow-y-auto bg-base-100 p-4">
          
          <Outlet />
        </main>
    
    </div>
  );
};

export default Layout;
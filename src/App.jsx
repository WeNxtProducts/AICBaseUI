import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import Sidebar from './pages/sidebar/Sidebar';
import Header from './pages/header/Header';
import './App.scss';

const App = () => {
 //npx prettier --write .
 const ignorePaths = [`/`, `/login`, `/newlogin`, `/resetpassword`, `/quote`];
 const location = useLocation();
 const [currentPath, setCurrentPath] = useState(true);

 useEffect(() => {
  const checkPaths = ignorePaths.includes(location.pathname);
  setCurrentPath(checkPaths);
 }, [location.pathname]);

 return (
  <div className='App'>
   {!currentPath && <Sidebar />}
   {!currentPath && (
    <div className='header-content'>
     <Header />
    </div>
   )}
   <div className={!currentPath ? `app-content` : ''}>
    <AppRouter />
   </div>
  </div>
 );
};

export default App;

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute(props) {
 // Reference : https://www.robinwieruch.de/react-router-private-routes/
 const isLoggedIn = useSelector(state => state?.tokenAndMenuList?.token);
 const redirectPath = '/login';

//  if (isLoggedIn?.length === 0) {
//   return <Navigate to={redirectPath} replace />;
//  }
 return <Outlet />;
}
export default ProtectedRoute;

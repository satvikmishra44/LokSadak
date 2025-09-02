// import { Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// function ProtectedRoute({children}) {
//     const {user} = useAuth();
//     if(user === null){
//         return <div>Loading...</div>
//     }
//     return user ? children : <Navigate to="/auth" />
// }

// export default ProtectedRoute;

import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const backendUrl = 'http://localhost:3000';

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get(`${backendUrl}/auth/me`, { withCredentials: true });
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/auth" replace />;
}

export default ProtectedRoute;

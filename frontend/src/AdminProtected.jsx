import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendUrl = 'http://localhost:3000';

function AdminProtected({ children }) {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get(`${backendUrl}/auth/me`, { withCredentials: true });
        setUser(res.data.user);
        if (!res.data.user?.officer) {
          alert("This Page Can Only Be Accessed By Authorised Officer Only");
          useNavigate("/auth");
        }
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

export default AdminProtected;
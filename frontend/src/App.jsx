import Auth from './components/Auth';
import Home from './components/Home';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import RegisterRoad from './components/RegisterRoad';
import Details from './components/Details';
import NotFound from './components/NotFound';
import Scan from './components/Scan';
import Complaint from './components/Complaint';
import AdminProtected from './AdminProtected';
import AllComplaints from './components/AllComplaints';
import axios from 'axios';
import { useEffect } from 'react';
import ComplaintDetail from './components/ComplaintDetail';
import Panel from './admin/Panel';
import CreateOfficer from './admin/CreateOfficer';
import AdminComplaint from './admin/AdminComplaint';

function LogoutHandler({ backendUrl }) {
  const navigate = useNavigate();
  useEffect(() => {
    async function logout() {
      try {
        await axios.post(`${backendUrl}/auth/logout`, {}, { withCredentials: true });
        navigate("/auth");
      } catch (err) {
        console.error("Logout failed:", err);
      }
    }
    logout();
  }, [backendUrl, navigate]);
}


function App() {

  const backendUrl = 'http://localhost:3000'

  return (
      <Routes>
        <Route path="/" element={<Home backendUrl={backendUrl}/>} />
        <Route path='/auth' element={<Auth backendUrl={backendUrl}/>} />
        <Route path='/register' element={<AdminProtected><RegisterRoad backendUrl={backendUrl}/></AdminProtected>}/>
        <Route path='/road/:code' element={<Details backendUrl={backendUrl}/>} />
        <Route path='*' element={<NotFound />} />
        <Route path='/scan' element={<Scan />} />
        <Route path='/complaint' element={<ProtectedRoute><Complaint backendUrl={backendUrl}/> </ProtectedRoute>} />
        <Route path='/complaints' element={<ProtectedRoute><AllComplaints backendUrl={backendUrl} /></ProtectedRoute>} />
        <Route path='/logout' element={<LogoutHandler backendUrl={backendUrl}/>} />
        <Route path='/complaint/:id' element={<ProtectedRoute><ComplaintDetail backendUrl={backendUrl} /></ProtectedRoute>} />
        <Route path='/panel' element={<AdminProtected><Panel backendUrl={backendUrl}/></AdminProtected>} />
        <Route path='/create' element={<AdminProtected><CreateOfficer backendUrl={backendUrl} /></AdminProtected>}/>
        <Route path='admin/complaint/:id' element={<AdminProtected><AdminComplaint backendUrl={backendUrl}/></AdminProtected>} />
      </Routes>
  );
}

export default App;
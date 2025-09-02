import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import person from '../images/person.png';
import { useNavigate } from "react-router-dom";


function Panel({backendUrl}) {

    const [complaints, setComplaints] = useState([]);
    const [user, setUser] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [finding, setFinding] = useState(false);
    

    // Get Admin's Alloted Requests
    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await axios.get(`${backendUrl}/auth/me`, { withCredentials: true });
                setUser(res.data?.user);
                const comp = await axios.get(`${backendUrl}/admin/my`, {params: {id: res.data.user.id}, withCredentials: true});
                setComplaints(comp.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, [])

    // Get Pending Requests
    const pending = async(req, res) => {
        try{
            const comp = await axios.get(`${backendUrl}/admin/pending`);
            setComplaints(comp.data); 
        }catch(err){
            console.error(err);
        }
    }

    // Find The Requests
    const find = async(req, res) => {
        try{
            const comp = await axios.get(`${backendUrl}/admin/find`, {params: {id: search}});
            setComplaints(Array.isArray(comp.data) ? comp.data : [comp.data]);
        }catch(err){
            console.error(err);
        }
    }

    // Color icons for status
  const statusMap = {
    Pending: {
      bg: "bg-yellow-100 text-yellow-700",
      icon: (
        <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" />
          <path d="M12 8v4l2 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    "In Progress": {
      bg: "bg-blue-100 text-blue-700",
      icon: (
        <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" />
          <path d="M12 6v6l4 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    Resolved: {
      bg: "bg-green-100 text-green-700",
      icon: (
        <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" />
          <path d="M9 12l2 2l4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  };


    return (
        <div className="flex flex-col items-center justify-center text-center mt-5">
            <div className="dikkat text-center mt-4 text-6xl">
                LokSadak
            </div>

            <div 
                    className="rounded-full w-[100px] h-[100px] overflow-hidden flex items-center justify-center mt-3"
                    style={{
                      background: 'linear-gradient(145deg, #fdfbf4, #f8f2e0)',
                      boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.08), -4px -4px 8px rgba(255, 255, 255, 0.7)',
                      border: '2px solid #f8f2e0'
                    }}
                  >
                    <img
                      src={person}
                      alt="person"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1>Welcome {user.name}</h1>
                  </div>

                  <div className="w-[80%] h-[2px] bg-gray-400 my-8 mx-auto rounded-full"></div>

            <nav className="flex flex-row justify-between text-center gap-6 mt-3">

                <button
      className="w-auto md:w-auto md:min-w-[10rem] py-3 px-6 bg-green-600 text-white font-bold rounded-xl shadow-md hover:bg-red-700 focus:ring-2 focus:ring-red-400 transition"
      onClick={() => window.location.reload()}
    >
      <i className="fa-solid fa-briefcase"></i> My Tasks
    </button>

                <button
      className="w-auto md:w-auto md:min-w-[10rem] py-3 px-6 bg-yellow-600 text-white font-bold rounded-xl shadow-md hover:bg-red-700 focus:ring-2 focus:ring-red-400 transition"
      onClick={pending}
    >
      <i className="fa-regular fa-clock"></i> Pending
    </button>
                <button
  className="w-auto md:w-auto md:min-w-[10rem] py-3 px-6 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-red-700 focus:ring-2 focus:ring-red-400 transition"
  onClick={() => setFinding(!finding)}   // ✅ toggle state properly
>
  <i className="fa-solid fa-magnifying-glass"></i> Find
</button>

                <button
      className="w-auto md:w-auto md:min-w-[10rem] py-3 px-6 bg-red-600 text-white font-bold rounded-xl shadow-md hover:bg-red-700 focus:ring-2 focus:ring-red-400 transition"
      onClick={() => navigate("/logout")}
    >
      Logout
    </button>
            </nav>

{finding && (
  <div className="flex items-center gap-2 mb-6 mt-4 w-[70%]">
    <input
      type="text"
      placeholder="Enter Complaint ID"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
    />
    <button
      onClick={find}
      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
    >
      Search
    </button>
  </div>
)}
            <div className="w-[80%] h-[2px] bg-gray-400 my-8 mx-auto rounded-full"></div>

            <div className="mt-6 w-full px-6 mb-4">
  {complaints.length > 0 ? (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {complaints.map((c) => {
        const statusStyles = statusMap[c.status] || statusMap.Pending; // make sure statusMap is defined
        return (
          <div
            key={c._id}
            onClick={() => navigate(`/admin/complaint/${c._id}`)}
            className="group cursor-pointer bg-[#fffaf0] shadow-lg rounded-2xl p-5 flex flex-col h-full border border-gray-200 hover:shadow-2xl transition-all"
          >
            {/* Complaint Image */}
            <div className="mb-4 overflow-hidden rounded-xl relative aspect-video bg-gray-100">
              <img
                src={c.imageUrl || "/default-image.png"}
                alt="Complaint"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            {/* Textual Content */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1 tracking-wide">
                  <span className="text-yellow-700">Road ID:</span> {c.roadId}
                </p>

                <p className="text-base font-semibold text-gray-800 mb-3 line-clamp-2">
                  {c.detail}
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <p className="text-sm text-gray-700 font-medium">
                  <span className="text-gray-900 font-bold">Submitted On:</span>{" "}
                  {new Date(c.submittedOn).toLocaleDateString()}
                </p>

                <div className="flex items-center justify-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold flex items-center text-center justify-center gap-1 ${statusStyles.bg} transition`}
                  >
                    {statusStyles.icon}
                    {c.status}
                  </span>
                </div>

                {c.remarks && (
                  <p className="text-sm text-gray-700 font-medium mt-1">
                    <span className="font-bold text-gray-900">Remarks:</span>{" "}
                    {c.remarks}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p className="mt-4 text-gray-600">No complaints to resolve here</p>
  )}

        </div>

        </div>
    );
}

export default Panel;
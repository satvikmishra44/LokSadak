import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AllComplaints({ backendUrl }) {
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [name, setName] = useState(" ");
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get(`${backendUrl}/auth/me`, { withCredentials: true });
        setName(res.data?.user?.name);
        const comp = await axios.get(`${backendUrl}/complaint/get`, {
          params: { userId: res.data.user._id },
          withCredentials: true
        });
        setComplaints(comp.data);
      } catch (err) {
        console.error("Error: ", err);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [backendUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-amber-100 to-blue-50">
        <p className="text-lg md:text-xl font-medium text-gray-600 animate-pulse">Loading complaints...</p>
      </div>
    );
  }

  if (complaints.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-amber-100 to-blue-50">
        <p className='font-bold text-5xl md:text-6xl dikkat'>LokSadak</p>
        <p className="mt-6 text-lg font-medium text-gray-700">No complaints done by {name}.</p>
        <button
          className="w-[90%] md:w-[22rem] mt-6 py-3 bg-yellow-600 text-white font-bold shadow-md rounded-xl hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-400 transition"
          onClick={() => navigate("/complaint")}
        >
          Register A New Complaint
        </button>
        <button
        className="w-[90%] md:w-[22rem] mt-4 py-3 bg-red-600 text-white font-bold shadow-md rounded-xl hover:bg-red-700 focus:ring-2 focus:ring-red-400 transition"
        onClick={()  => navigate('/logout')}
      >
        Logout
      </button>
      </div>
    );
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
    <div className="min-h-screen bg-gradient-to-tr from-amber-100 to-blue-50 px-2 md:px-8 py-6">
      <div className="max-w-7xl mx-auto">

<div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4 md:gap-0">
  {/* Left: Logo */}
  <p className="font-bold text-4xl md:text-5xl dikkat text-center md:text-left w-full md:w-auto">
    LokSadak
  </p>

  {/* Right: Buttons as a group */}
  <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
    <button
      className="w-[90%] md:w-auto md:min-w-[16rem] py-3 px-6 bg-yellow-600 text-white font-bold rounded-xl shadow-md hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500 transition"
      onClick={() => navigate("/complaint")}
    >
      Register A New Complaint
    </button>

    <button
      className="w-[90%] md:w-auto md:min-w-[10rem] py-3 px-6 bg-red-600 text-white font-bold rounded-xl shadow-md hover:bg-red-700 focus:ring-2 focus:ring-red-400 transition"
      onClick={() => navigate("/logout")}
    >
      Logout
    </button>
  </div>
</div>

        <div className="w-[80%] h-[2px] bg-gray-300 my-8 mx-auto rounded-full"></div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">All Complaints</h1>

        <div className="w-[80%] h-[2px] bg-gray-300 my-8 mx-auto rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((c) => {
            const statusStyles = statusMap[c.status] || statusMap.Pending;
            return (
              <>
                <div
                key={c._id}
                onClick={() => navigate(`/complaint/${c._id}`)}
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
                    {/* Road ID */}
                    <p className="text-sm font-bold text-gray-900 mb-1 tracking-wide">
                      <span className="text-yellow-700">Road ID:</span> {c.roadId}
                    </p>

                    {/* Complaint Detail */}
                    <p className="text-base font-semibold text-gray-800 mb-3 line-clamp-2">
                      {c.detail}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    {/* Submitted On */}
                    <p className="text-sm text-gray-700 font-medium">
                      <span className="text-gray-900 font-bold">Submitted On:</span>{" "}
                      {new Date(c.submittedOn).toLocaleDateString()}
                    </p>

                    {/* Status */}
                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${statusStyles.bg} transition`}
                      >
                        {statusStyles.icon}
                        {c.status}
                      </span>
                    </div>

                    {/* Remarks */}
                    {c.remarks && (
                      <p className="text-sm text-gray-700 font-medium mt-1">
                        <span className="font-bold text-gray-900">Remarks:</span> {c.remarks}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-[80%] h-[2px] md:hidden bg-gray-400 my-8 mx-auto rounded-full"></div>
            </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AllComplaints;

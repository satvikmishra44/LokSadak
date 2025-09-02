import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ComplaintDetail({ backendUrl }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComplaint() {
      try {
        const res = await axios.get(`${backendUrl}/complaint/${id}`, {
          params: { id: id },
          withCredentials: true,
        });
        setComplaint(res.data);
      } catch (err) {
        console.error("Error fetching complaint: ", err);
      } finally {
        setLoading(false);
      }
    }
    fetchComplaint();
  }, [id, backendUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-amber-100 to-blue-50">
        <p className="text-lg md:text-2xl font-medium text-gray-600 animate-pulse">
          Loading complaint details...
        </p>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-amber-100 to-blue-50">
        <p className='font-bold text-5xl md:text-6xl text-blue-700'>LokSadak</p>
        <br />
        <p className="text-lg font-medium text-red-600">
          Complaint not found.
        </p>
      </div>
    );
  }

  // Dynamic status color and icon
  const statusMap = {
    Pending: {
      bg: "bg-yellow-100 text-yellow-800",
      icon: (
        <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" />
          <path d="M12 8v4l2 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    "In Progress": {
      bg: "bg-blue-100 text-blue-800",
      icon: (
        <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" />
          <path d="M12 6v6l4 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    Resolved: {
      bg: "bg-green-100 text-green-800",
      icon: (
        <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" />
          <path d="M9 12l2 2l4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  };
  const status = statusMap[complaint.status] || statusMap.Pending;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-amber-100 to-blue-50">
      {/* Top Banner */}
      <div className="relative w-full h-64 md:h-[28rem] overflow-hidden">
        <img
          src={complaint.imageUrl || "/default-image.png"}
          alt="Complaint"
          className="w-full h-full object-cover object-center transition-all ease-in-out"
          style={{ aspectRatio: "16/6" }}
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-black/50 hover:bg-black/70 text-white px-5 py-2 rounded-full shadow-lg text-md font-semibold transition"
        >
          ← Back
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-10 py-8 md:py-14">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 space-y-8 transition-all">
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 pb-2 border-b">Complaint Details</h1>

          <div className="space-y-7 text-gray-700">
            <div>
              <h2 className="text-base font-bold text-gray-600 uppercase tracking-wide">Road ID or Detail</h2>
              <p className="mt-1 text-lg md:text-xl">{complaint.roadId}</p>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-600 uppercase tracking-wide">Detail</h2>
              <p className="mt-1 leading-relaxed md:text-lg text-justify">{complaint.detail}</p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div>
                <h2 className="text-base font-bold text-gray-600 uppercase tracking-wide">Submitted On</h2>
                <p className="mt-1 text-md">{new Date(complaint.submittedOn).toLocaleString()}</p>
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-600 uppercase tracking-wide">Status</h2>
                <span
                  className={`flex items-center mt-1 px-4 py-1 rounded-full font-semibold text-base shadow-sm ${status.bg}`}
                >
                  {status.icon}
                  {complaint.status}
                </span>
              </div>
            </div>

            {complaint.remarks && (
              <div>
                <h2 className="text-base font-bold text-gray-600 uppercase tracking-wide">Remarks</h2>
                <p className="mt-1 md:text-lg">{complaint.remarks}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetail;

import { useState, useEffect } from "react";
import Alert from "./Alert";
import { useZxing } from "react-zxing";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Complaint({ backendUrl }) {
  const [road, setRoad] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [user, setUser] = useState(null);
  const [scan, setScan] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  
function QRScanner({ onResult, onClose }) {
    const { ref } = useZxing({
        onDecodeResult: onResult,
        constraints: { video: { facingMode: "environment" } },
    });
    return (
        <div className="flex flex-col items-center">
        <video ref={ref} className="w-full max-w-[340px] rounded-lg shadow-md border" />
        <button onClick={onClose} className="mt-2 px-3 py-1 bg-gray-500 text-white rounded">Close Scanner</button>
        </div>
    );
    }

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(`${backendUrl}/auth/me`, { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      }
    }
    getUser();
  }, [backendUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const showAlert = (type, message) => {
    setAlert({ message: message, type: type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !user._id) {
      showAlert("error", "User not loaded yet, please wait.");
      return;
    }
    if (!image) {
      showAlert("error", "Image Is Necessary");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      try {
        const res = await axios.post(`${backendUrl}/complaint/post`, {
          userId: user._id,
          roadId: road,
          detail: description,
          image: base64Image,
        });
        showAlert("success", "Complaint Submitted Succesfully");
        navigate('/complaints');
      } catch (err) {
        console.error(err);
        showAlert("error", "Error Submitting Complaint");
      }
    };
    reader.readAsDataURL(image);
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-8 bg-[#fcf8e9]">
      {/* Fixed Alert (no width change, bottom center) */}
      {alert && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[92vw] sm:w-[420px] z-50 animate-popIn">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}

      <div className="text-center mt-4">
        <p className="font-bold text-4xl md:text-5xl dikkat">LokSadak</p>
        <p className="bubble-heading text-lg mt-2">Register Your Complaint</p>
      </div>

      <div className="w-full max-w-2xl my-8">
        <div className="w-[90%] mx-auto h-[2px] bg-gray-300 rounded-full" />
      </div>

      <form
        className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col gap-7 border"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-2">Make Sure Details Are Accurate</h2>
        <div className="flex flex-col gap-4">

          <label className="text-left font-medium text-gray-700 w-[90%] mx-auto">
            Road Name Or Road Code
            <input
              type="text"
              placeholder="Road Name Or Road Code"
              value={road}
              onChange={(e) => setRoad(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-800 shadow-sm transition"
            />
          </label>

            <button
  type="button"
  className="w-[90%] mx-auto py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-400 shadow transition"
  onClick={() => setScan(!scan)}
>
  {scan && (
    <QRScanner
      onResult={(result) => {
        setRoad(result.getText());
        setScan(false);
      }}
      onClose={() => setScan(false)}
    />
  )}
  {scan ? "Stop QR Scan" : "Scan QR To Autofill Road Code"}
</button>


          <label className="text-left font-medium text-gray-700 w-[90%] mx-auto">
            Detailed Description Of Your Complaint
            <textarea
              rows="4"
              placeholder="Describe the issue in detail (location, landmark, nature of problem, etc.)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-800 shadow-sm transition resize-none"
            />
          </label>

          <div className="w-[90%] mx-auto flex flex-col sm:flex-row gap-4 items-center">
            <label className="block flex-1 font-medium text-gray-700">
              Upload An Image <span className="text-red-500">*</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 block w-full text-sm text-gray-600 file:bg-yellow-600 file:text-white file:px-4 file:py-2 file:rounded file:font-semibold focus:outline-yellow-500"
                required
              />
            </label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-xl border shadow"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-[90%] mx-auto py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-400 shadow transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Complaint;

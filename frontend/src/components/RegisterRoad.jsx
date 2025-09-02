import { use, useEffect, useState } from 'react';
import person from '../images/person.png';
import axios from 'axios';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

function RegisterRoad({backendUrl}) {

  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [pin, setPin] = useState(undefined);
  const [tender, setTender] = useState(undefined);
  const [mlaname, setMlName] = useState("");
  const [mlstart, setMLstart] = useState(undefined);
  const [mlend, setMLend] = useState(undefined);
  const [mlparty, setmlparty] = useState("");
  const [mpname, setMpName] = useState("");
  const [mpstart, setMPstart] = useState(undefined);
  const [mpend, setMPend] = useState(undefined);
  const [mpparty, setMPparty] = useState("");
  const [parshad, setParshad] = useState("");
  const [parshadstart, setParshadstart] = useState(undefined);
  const [parshadend, setParshadEnd] = useState(undefined);
  const [parshadparty, setParshadparty] = useState("");
  const [contractor, setContractor] = useState("");
  const [constart, setConstart] = useState(undefined);
  const [conend, setConend] = useState(undefined);
  const [company, setCompany] = useState("");
  const [alert, setAlert] = useState(null);
  

  useEffect(()=> {
    async function getUser() {
      try{
        const res = await axios.get(`${backendUrl}/auth/me`, {withCredentials: true});
        setUser(res.data.user);
      } catch(err){
        console.error(err);
      }
    }

    getUser();
  }, []);

  const navigate = useNavigate();

  const showAlert = (type, message) => {
    setAlert({ message: message, type: type });
    setTimeout(() => setAlert(null), 3000);
  }

  const register = async () => {
    try{
      const res = await axios.post(`${backendUrl}/road/register`, {name: name, pin: pin, tender: tender, mla: {name: mlaname, tenure: `${mlstart} - ${mlend}`, party: mlparty}, mp: {name: mpname, tenure: `${mpstart} - ${mpend}`, party: mpparty}, parshad: {name: parshad, tenure: `${parshadstart} - ${parshadend}`, party: parshadparty}, contractor: {name: contractor, tenure: `${constart} - ${conend}`, party: company}, registeredBy: user.id});
      if(res.data?.success){  
        showAlert('success', "Road Registered Succesfully");
        navigate(`/road/${res.data?.code}`);
      }
    } catch(err) {
      console.error(err);
      showAlert('error', err.response?.data?.message);
    }
  } 

    return (
        <div className='flex flex-col items-center justify-center text-center mt-5'>
          {alert && (
            <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[420px] animate-popIn">
              <Alert type={alert.type} message={alert.message} />
            </div>
          )}

        <div 
        className="rounded-full w-[100px] h-[100px] overflow-hidden flex items-center justify-center"
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

      <div>
        Register A New Road
      </div>

      <div className="w-[80%] h-[2px] bg-gray-300 my-8 mx-auto rounded-full"></div>

      <div className="w-[90%] p-8 rounded-2xl shadow-lg bg-[#fffaf0] hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Road Information</h2>
        
        <div className="flex flex-col gap-4">

          <div className="flex flex-col md:flex-row gap-4">
            <input required
              type="text" 
              value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Exact Name And Section Of Road" 
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
            <input 
              type="number" 
              value={pin} onChange={(e) => setPin(e.target.value)} min="100000" max="999999" required
              placeholder="Enter Pin Code" 
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <input 
            type="number" required
            placeholder="Enter Exact Tender Amount" value={tender} onChange={(e) => setTender(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          />

        </div>

      </div>


      <div className="w-[80%] h-[2px] bg-gray-300 my-8 mx-auto rounded-full"></div>

      <div className="w-[90%] p-8 rounded-2xl shadow-lg bg-[#fffaf0] hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Sitting MLA Information</h2>
        
        <div className="flex flex-col gap-4">

          <input 
              type="text" 
              placeholder="Full Name Of MLA" value={mlaname} onChange={(e) => setMlName(e.target.value)} required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

          <div className="flex flex-col md:flex-row gap-4">
            
            <input 
              type="number" 
              placeholder="Start Of Tenure" value={mlstart} onChange={(e) => setMLstart(e.target.value)} min="1990" max="2100" required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

            <input 
            type="number" 
            placeholder="Expected End Of Current Tenure" value={mlend} onChange={(e) => setMLend(e.target.value)} min={mlstart} max="2100" required
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          />

          </div>

          <input 
              type="text" 
              placeholder="Party Name" value={mlparty} onChange={(e) => setmlparty(e.target.value)} required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

        </div>

      </div>
        
      {/* MP Information */}
      <div className="w-[80%] h-[2px] bg-gray-300 my-8 mx-auto rounded-full"></div>

        <div className="w-[90%] p-8 rounded-2xl shadow-lg bg-[#fffaf0] hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Sitting MP Information</h2>
          
          <div className="flex flex-col gap-4">

            <input 
                type="text" 
                placeholder="Full Name Of MP" value={mpname} onChange={(e) => setMpName(e.target.value)} required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />

            <div className="flex flex-col md:flex-row gap-4">
              
              <input 
                type="number" 
                placeholder="Start Of Tenure" min="1990" max="2100" value={mpstart} onChange={(e) => setMPstart(e.target.value)} required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />

              <input 
              type="number" 
              placeholder="Expected End Of Current Tenure" min="1990" max="2100" value={mpend} onChange={(e) => setMPend(e.target.value)} required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

            </div>

            <input 
                type="text" 
                placeholder="Party Name" value={mpparty} onChange={(e) => setMPparty(e.target.value)} required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />

          </div>

      </div>


      {/* MP Information */}
      <div className="w-[80%] h-[2px] bg-gray-300 my-8 mx-auto rounded-full"></div>

      <div className="w-[90%] p-8 rounded-2xl shadow-lg bg-[#fffaf0] hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Sitting Parshad Information</h2>
        
        <div className="flex flex-col gap-4">

          <input 
              type="text" 
              placeholder="Full Name Of Parshad" value={parshad} onChange={(e) => setParshad(e.target.value)} required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

          <div className="flex flex-col md:flex-row gap-4">
            
            <input 
              type="number" 
              placeholder="Start Of Tenure" min="1990" max="2100" value={parshadstart} onChange={(e) => setParshadstart(e.target.value)} required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

            <input 
              type="number" 
              placeholder="Expected End Of Current Tenure" min="1990" max="2100" value={parshadend} onChange={(e) => setParshadEnd(e.target.value)} required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

          </div>

          <input 
              type="text" 
              placeholder="Party Name" value={parshadparty} onChange={(e) => setParshadparty(e.target.value)} required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

        </div>

      </div>

          
      <div className="w-[80%] h-[2px] bg-gray-300 my-8 mx-auto rounded-full"></div>

          <div className="w-[90%] p-8 rounded-2xl shadow-lg bg-[#fffaf0] hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Contractor Information</h2>
            
            <div className="flex flex-col gap-4">

              <input 
                  type="text" 
                  placeholder="Full Name Of Contractor" value={contractor} onChange={(e) => setContractor(e.target.value)} required
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                />

              <div className="flex flex-col md:flex-row gap-4">
                
                <input 
                  type="number" 
                  placeholder="Start Of Contract" min="1990" max="2100" value={constart} onChange={(e) => setConstart(e.target.value)} required
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                />

                <input 
                type="number" 
                placeholder="End Of Contract" min="1990" max="2100" value={conend} onChange={(e) => setConend(e.target.value)} required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                />

              </div>

              <input 
                  type="text" 
                  placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                />

            </div>

      </div>    

  <button 
        className="w-[90%] mt-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition md:w-[50vw]" onClick={register}
      >
        Register
      </button>
        </div>

    );
}

export default RegisterRoad;
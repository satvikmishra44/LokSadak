import axios from 'axios';
import {QRCodeCanvas} from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import grievance from '../images/grievance.png';
import { Typewriter } from 'react-simple-typewriter';

function Details({backendUrl}) {

    const {code} = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState({});
    const qrRef = useRef();

    useEffect(()=> {
        async function getDetails() {
            try{
            const res = await axios.get(`${backendUrl}/road/details/${code}`);
            if(res.data?.success){
                setDetails(res.data);
            }
            } catch(err){
                console.error(err);
                navigate('/invalid');
            }
        }

        getDetails();
    }, [])

    const downloadQR = () =>  {
        const canvas = qrRef.current.querySelector("canvas");
        const pngurl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

        let link = document.createElement('a');
        link.href = pngurl;
        link.download = `${details.name}-qrcode.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className='flex flex-col items-center gap-6'>
            <h1 className='dikkat text-7xl mt-4'>LokSadak</h1>
            {/* QR Code And Download Button */}
            <div ref={qrRef}>
            <QRCodeCanvas value={code} size={200} bgColor='#fcf8e9' fgColor='#000000' level='H' marginSize={2} />
            </div>

            <button
                onClick={downloadQR}
                className="px-4 py-2 bg-gray-800 text-[#fcf8e9] rounded-lg hover:bg-transparent hover:text-gray-800 border border-gray-800 transition"
            >Download QR</button>

            <div className='type-text font-bold text-3xl'>
                {details.name}
            </div>
            <div className='type-text flex text-center'>
                Pin Code: {details.pin} <br />
                Tender Amount: ₹{details.tender}
            </div>

            {/* MLA Info */}

            <div className="w-[80%] h-[2px] bg-gray-300 my-8 mx-auto rounded-full"></div>

            <div className="w-[90%] p-8 rounded-2xl shadow-lg bg-[#fffaf0] hover:shadow-xl transition">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">MLA At Inaugration</h2>
                <p className='type-text text-center font-semibold text-3xl'>{details.mla?.name}</p>
                <p className='type-text text-xl text-center'>{details.mla?.tenure}</p>
                <p className='type-text text-lg text-center'>({details.mla?.party})</p>
            </div>
            
            <div className="w-[80%] h-[2px] bg-gray-300 my-8 mx-auto rounded-full"></div>

            {/* MP Info */}
            <div className="w-[90%] p-8 rounded-2xl shadow-lg bg-[#fffaf0] hover:shadow-xl transition">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">MP At Inaugration</h2>
                <p className='type-text text-center font-semibold text-3xl'>{details.mp?.name}</p>
                <p className='type-text text-xl text-center'>{details.mp?.tenure}</p>
                <p className='type-text text-lg text-center'>({details.mp?.party})</p>
            </div>

            <div className="w-[80%] h-[2px] bg-gray-300 my-8 mx-auto rounded-full"></div>

            {/* Parshad Info */}
            <div className="w-[90%] p-8 rounded-2xl shadow-lg bg-[#fffaf0] hover:shadow-xl transition">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Parshad At Inaugration</h2>
                <p className='type-text text-center font-semibold text-3xl'>{details.parshad?.name}</p>
                <p className='type-text text-xl text-center'>{details.parshad?.tenure}</p>
                <p className='type-text text-lg text-center'>({details.parshad?.party})</p>
            </div>

            <div className="w-[80%] h-[2px] bg-gray-300 my-8 mx-auto rounded-full"></div>

            {/* Contractor Info */}
            <div className="w-[90%] p-8 rounded-2xl shadow-lg bg-[#fffaf0] hover:shadow-xl transition">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Contractor</h2>
                <p className='type-text text-center font-semibold text-3xl'>{details.contractor?.name}</p>
                <p className='type-text text-xl text-center'>{details.contractor?.tenure}</p>
                <p className='type-text text-lg text-center'>({details.contractor?.party})</p>
            </div>

            <div className="w-[80%] h-[2px] bg-gray-300 my-8 mx-auto rounded-full"></div>

            <div className='bubble-heading text-sm'>
                Information Submitted By:- EC {details.registeredBy} 
            </div>

            <div className="w-[80%] h-[2px] bg-gray-300 my-8 mx-auto rounded-full"></div>

            <div className='w-full flex flex-col grow justify-center text-center mt-4' style={{
    background: `linear-gradient(to bottom, #fcf8e9 0%, #fcf8e9 81.6%, #7d985b 81.6%, #7d985b 100%)`
  }}>
        <p className='dikkat text-6xl'>Dikkat Hai?</p>
        {/* <p className='type-text text-2xl'> Call Us On 1800-1234-XXXX And We'll Address It Immediately</p> */}
        <p className="type-text text-2xl">
          <Typewriter
            words={["Call Us On 1800-1234-XXXX And We'll Address It Immediately"]}
            loop={1}
            typeSpeed={50}
            deleteSpeed={0}
            delaySpeed={1000}
          />
          <div className='text-red-600 cursor-pointer underline' onClick={() => navigate("/complaint")}>
          <Typewriter
            words={["Or Click Here To Register A Complaint"]}
            loop={1}
            typeSpeed={50}
            deleteSpeed={0}
            delaySpeed={1000}
            cursor
            cursorStyle="|"
          />
          </div>
        </p>
        <img src={grievance} alt="Grievance Image" className="w-full max-h-[500px] object-contain px-4"/>
      </div>
      
        </div>
    );
}

export default Details;
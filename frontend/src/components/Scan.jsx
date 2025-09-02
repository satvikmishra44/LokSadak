import React from 'react';
import {useZxing} from 'react-zxing'
import { useNavigate } from 'react-router-dom';

function Scan() {

    const navigate = useNavigate();
    const {ref} = useZxing({
        onDecodeResult(result){
            const qrdata = result.getText();
            if(qrdata){
                navigate(`/road/${qrdata}`);
            }
        }
    });

    return (
        <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-xl font-bold">Scan QR Code</h1>
      <video ref={ref} className="w-[80%] h-[60%] rounded-lg shadow-md" />
      <p className="text-gray-600">Point your camera at QR code of a nearby road</p>
    </div>
    );
}

export default Scan;
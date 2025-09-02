import { Typewriter } from "react-simple-typewriter";

function NotFound() {
    return (
        <div className='flex flex-col items-center text-center overflow-hidden justify-center min-h-screen'>
            <h1 className='dikkat text-6xl mt-10'>LokSadak</h1>
            <p className="type-text text-2xl mt-4">
          <Typewriter
            words={["The Road You Looked For May Not Exist Or You Scanned An Invalid QR"]}
            loop={1}
            typeSpeed={50}
            deleteSpeed={0}
            delaySpeed={1000}
            cursor
            cursorStyle="|"
            
          />
        </p>
        </div>
    );
}

export default NotFound;
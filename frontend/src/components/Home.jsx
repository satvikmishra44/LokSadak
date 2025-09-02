import { useEffect, useRef, useState } from 'react'
import '../App.css'
import road from '../images/road.png'
import QR from '../images/QR1.png'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import timeline from '../images/timeline.png';
import grievance from '../images/grievance.png';
import {Typewriter} from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';

function Home({backendUrl}) {

  const headRef = useRef(null);
  const captionRef = useRef(null);
  const howRef = useRef(null);
  const QRref = useRef(null);
  const scantextRef = useRef(null);
  const MLimgRef = useRef(null);
  const mltextRef = useRef(null);
  const callRef = useRef(null);
  const dikkatRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headRef.current,
      {y:-50, opacity: 0},
      {y: 0, opacity: 1, duration: 1.5, ease: 'power3.out'}
    );
    gsap.fromTo(
  captionRef.current.children,
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 1,
    ease: 'power2.out',
    stagger: 0.3
  }
);
  }, [])


  // ScrollTrigger For How To Section
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(howRef.current, 
  {
    opacity: 0,
    y: 50
  },
  {
    opacity: 1, // Explicitly set the end state
    y: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: howRef.current,
      start: 'top 90%',
      toggleActions: 'play none none none',
    }
  }
);
    gsap.fromTo(QRref.current, {
        opacity: 0,
        y: 50,},
        {
           opacity: 1,
    y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger:{
            trigger: QRref.current,
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    })

    gsap.fromTo(scantextRef.current, {
        opacity: 0,
        y:50,},
        {
           opacity: 1,
    y: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: {
            trigger: scantextRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
        }
    })
  }, [])

  // MLA Text Animation Section
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(mltextRef.current, {x: -200, opacity: 0},{
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: mltextRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });

    gsap.fromTo(MLimgRef.current, {opacity: 0, x:200},{
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: MLimgRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    })
  }, [])

  // Call Us Section Animation

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(dikkatRef.current, {opacity: 0, y: 100}, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: dikkatRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    })

    gsap.fromTo(callRef.current, {opacity: 0, y: 100}, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: callRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    })
  }, [])

  const navigate = useNavigate();

  return (
    <div className='overflow-hidden'>
    {/* Navbar Start */}
    <nav className="top-0 left-0 w-full backdrop-blur-md bg-white/70 border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto flex justify-center items-center px-6 py-3 md:py-4">
        <div className="space-x-4 md:space-x-8 flex text-center">
          <button
            onClick={() => navigate("/register")}
            className="text-gray-700 text-lg hover:text-blue-700 cursor-pointer transition font-semibold px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/complaints")}
            className="text-gray-700 text-lg hover:text-blue-700 cursor-pointer transition font-semibold px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Complaint
          </button>
        </div>
      </div>
    </nav>
      <div className='h-[90vh] w-full bg-center bg-cover flex flex-col justify-center items-center rounded-b-xl' style={{backgroundImage: `url(${road})`}}>

        <div ref={headRef} className='lok-heading z-10 relative -translate-y-16'>
          LokSadak
        </div>
        <div ref={captionRef} className='caption'>
          <p>
            Aapka Kar, Aapki Sadak
          </p>
          <p>
            Iski Jaankaari Aapka Haq
          </p>
        </div>
        <button className="cursor-pointer transition-all bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg
        border-blue-600
        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]" onClick={() => navigate("/scan")}>
          <i className="fa-solid fa-camera"></i> Scan Now
        </button>
      </div>
      <div ref={howRef} className='bubble-heading text-blue-600 flex grow flex-col justify-center items-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-4'>
        How It Works?
      </div>
      <div className='flex flex-col lg:flex-row grow justify-center'>
        <div ref={QRref} className='left-0 sm:w-[90vw] lg:w-[30vw]'>
            <img src={QR} alt="QR Image" />
        </div>
        <div ref={scantextRef} className='spot-heading right-2 flex flex-col justify-center items-center text-center sm:text-xl lg:text-3xl'>
            Spot A QR Code Near Your Road
            <button className="Scan-button px-4 py-2 text-white text-base mt-2" onClick={() => navigate('scan')}>
            <p>Click Here To Scan It</p>
            </button>
        </div>
      </div>

<div className="w-[80%] h-[2px] bg-gray-300 my-8 mx-auto rounded-full"></div>

      <div className='flex flex-col lg:flex-row justify-center items-center text-center mt-4'>
          <div ref={mltextRef} className="MLA text-center w-[90vw] lg:w-[50vw] text-xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold leading-relaxed">
  <span className="text-red-600 border-b-4 border-red-600 pb-1">MLA</span>,&nbsp;
  <span className="text-blue-600 border-b-4 border-blue-600 pb-1">MP</span>,&nbsp;
  <span className="text-green-600 border-b-4 border-green-600 pb-1">Contractor</span>,&nbsp;
  <span className="text-purple-600 border-b-4 border-purple-600 pb-1">Engineer</span> 
  &nbsp;And All The Responsible One Would Appear On Your Screen With Their Mobile Number
</div>

          <div ref={MLimgRef}>
            <img src={timeline} alt="Timeline" className='h-[600px]' />
          </div>
      </div>

      <div className="w-[80%] h-[2px] bg-gray-300 my-8 mx-auto rounded-full"></div>

      <div className='flex flex-col grow justify-center text-center mt-4' style={{
    background: `linear-gradient(to bottom, #fcf8e9 0%, #fcf8e9 81.6%, #7d985b 81.6%, #7d985b 100%)`
  }}>
        <p ref={dikkatRef} className='dikkat text-6xl'>Dikkat Hai?</p>
        {/* <p className='type-text text-2xl'> Call Us On 1800-1234-XXXX And We'll Address It Immediately</p> */}
        <p ref={callRef} className="type-text text-2xl">
          <Typewriter
            words={["Call Us On 1800-1234-XXXX And We'll Address It Immediately"]}
            loop={1}
            typeSpeed={50}
            deleteSpeed={0}
            delaySpeed={1000}
          />
          <br />
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
  )
}

export default Home;
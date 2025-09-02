import React, { useState } from 'react';
import bgimg from '../images/bgimg.png';
import '../App.css';
import Alert from './Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Auth({ backendUrl }) {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const showAlert = (type, message) => {
    setAlert({ message: message, type: type });
    setTimeout(() => setAlert(null), 3000);
  }

  const navigate = useNavigate();

  const login = async () => {
    try{
        if(!mail || !password){
            showAlert('error', 'Please fill in all fields');
            return ;
        }

        if(password.length < 8){
            showAlert('error', 'Password must be at least 8 characters long');
            return ;
        }

        const res = await axios.post(`${backendUrl}/auth/login`, {email: mail, password}, {withCredentials: true});

        if(res.data?.success){
            showAlert('success', 'Login successful');
            if(res.data?.officer){
              navigate("/register");
            }else{
              navigate("/complaints");
            }
        }
        
    } catch(err){
        console.error(err);
        showAlert('error', err.response?.data?.message);
    }
  }

  const register = async() => {
    try{
        if(!name || !mail || !password){
            showAlert('error', 'Please fill in all fields')
            return ;
        }
        
        if(password.length < 8){
            showAlert('error', 'Password must be at least 8 characters long');
            return ;
        }

        const res = await axios.post(`${backendUrl}/auth/register`, {name, email: mail, password})
        if(res.data?.success){
            showAlert('success', 'Registration successful');
        }
    } catch(err){
        console.error(err);
        showAlert('error', err.response.data.message);
    }
  }

  return (
    <div
      className="bg-cover h-screen w-full flex justify-center items-center"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
        
      {alert && (
  <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[420px] animate-popIn">
    <Alert type={alert.type} message={alert.message} />
  </div>
)}

      <div className="form">
        <div className="header flex flex-col">{isLogin ? 'Login' : 'Register'}
            <br />
            <div className='dikkat text-[#d4b26a]'>to LokSadak</div>
        </div>
        <div className="inputs">
          {!isLogin && (
            <input placeholder="Full Name" className="input" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
          )}
          <input placeholder="Email" className="input" type="email" onChange={(e) => setMail(e.target.value)} required/>
          <input placeholder="Password" className="input" type="password" onChange={(e) => setPassword(e.target.value)} required/>

          <button className="sigin-btn" type="submit" onClick={isLogin ? login : register}>
            {isLogin ? 'Login' : 'Register'}
          </button>

          {isLogin && <a className="forget" href="#">Forgot password?</a>}

          <p className="signup-link">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>
              {isLogin ? ' Sign up' : ' Login'}
            </a>
          </p>
        </div>
      </div>

      {/* Styling */}
      <style>{`
        .form {
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: 0.75rem;
          background-color: #fcf8e9;
          color: #5c5b58;
          box-shadow: 20px 20px 30px rgba(0, 0, 0, .05);
          width: 22rem;
          background-clip: border-box;
        }
        .header {
          background-clip: border-box;
          background-color: #f2e5b8;
          background-image: linear-gradient(to top right, #f2e5b8, #fff3d4);
          margin: 10px;
          border-radius: 0.75rem;
          overflow: hidden;
          color: #b99652;
          box-shadow: rgba(92, 77, 0, .15) 0px 4px 8px;
          height: 7rem;
          font-weight: 600;
          font-size: 1.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .inputs {
          padding: 1.5rem;
          gap: 1rem;
          display: flex;
          flex-direction: column;
        }
        .input {
          border: 1px solid rgba(128, 128, 128, 0.4);
          outline: 0;
          color: #5c5b58;
          font-weight: 400;
          font-size: .9rem;
          padding: 0.75rem;
          background-color: #fffaf0;
          border-radius: .375rem;
          width: 100%;
        }
        .input:focus {
          border: 1px solid #d4b26a;
          box-shadow: 0 0 5px rgba(212, 178, 106, 0.5);
        }
        .checkbox-container {
          margin-left: -0.625rem;
          display: inline-flex;
          align-items: center;
        }
        .checkbox {
          overflow: hidden;
          padding: .55rem;
          border-radius: 999px;
          display: flex;
          align-items: center;
          cursor: pointer;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.027);
          height: 35px;
          width: 35px;
        }
        .checkbox input {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        .checkbox-text {
          cursor: pointer;
        }
        .sigin-btn {
          text-transform: uppercase;
          font-weight: 700;
          font-size: .75rem;
          text-align: center;
          padding: .75rem 1.5rem;
          background-color: #d4b26a;
          background-image: linear-gradient(to top right, #d4b26a, #f2d788);
          border-radius: .5rem;
          border: 0;
          color: #fff;
          transition: all 0.2s ease-in-out;
        }
        .sigin-btn:hover {
          background-image: linear-gradient(to top right, #b99652, #eac76a);
        }
        .signup-link {
          line-height: 1.5;
          font-weight: 300;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .signup-link a, .forget {
          line-height: 1.5;
          font-weight: 700;
          font-size: .875rem;
          margin-left: .25rem;
          color: #b99652;
          text-decoration: none;
        }
        .signup-link a:hover, .forget:hover {
          text-decoration: underline;
        }
        .forget {
          text-align: right;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

export default Auth;

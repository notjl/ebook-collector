import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';//install toastify package
import 'react-toastify/dist/ReactToastify.css'; 
import axios from '../api/axios';
import "./LoginPage.css";

import NavBar from '../components/Navbar';
import ImageBG from '../components/ImageBG';

const LOGIN_URL = '/login';


const LoginPage = () => {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');


    useEffect(() => {
        userRef.current.focus();
    }, [])
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        var body = 'grant_type=&username='+user+'&password='+pwd+'&scope=&client_id=&client_secret='

        try {
            const response = await axios.post(LOGIN_URL, body, {
                headers: {
                    'accept': 'application/json',
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
            const accessToken = response?.data;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken})
            console.log(accessToken.access_token)
            setUser('');
            setPwd('');
            //toast.error('Login Accepted')
            navigate(from, {replace: true});
            

        } catch (err) {
            if (!err.response) {
                setErrMsg('No server response');
                toast.error('No server response')
            } else if (err.response?.status == 422) {
                setErrMsg('Login Failed');
                toast.error('Login Failed')
            } else {
                setErrMsg('Unauthorized');
                toast.error('Unauthorized')
            }
            errRef.current.focus();
            
             
        }
        
    }
    

    return (
        <>
        <NavBar />
        <ImageBG heading='LOGIN'/>

         {success ? (
            <section>
                <h1>You are logged In!</h1>
              
                <ToastContainer //not yet tested  
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover
                    theme="light"
                    />

                <br />
                <p>
                    <a href="/">Go to Home</a>
                </p>
            </section>
         ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"></p> 
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="light"
                />
                
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'></label>
                <input className="email" type="text" placeholder='EMAIL'
                    name="" 
                    id="username" 
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                
                <label htmlFor='password'></label>
                <input className="password" type="password" placeholder='PASSWORD'
                    name="" 
                    id="password" 
                    autoComplete="off"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                />
                <button className='submit'>LOG IN</button>

            </form>
            <p>
                Need an Account?<br/>
                <span className="line">
                    <p>Contact your Institute Administration</p>
                    
                </span>
            </p>
        </section>
        )}
        </>
    )
} 
export default LoginPage;
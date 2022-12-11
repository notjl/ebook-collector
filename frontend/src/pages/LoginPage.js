import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import axios from '../api/axios';
import "./LoginPage.css";
import useAuth from '../hooks/useAuth';
import NavBar from '../components/Navbar';
import ImageBG from '../components/ImageBG';

const LoginPage = () => {

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const checkAuth = () => {
        let refreshauth = JSON.parse(sessionStorage.getItem('key'))
        if (refreshauth !== null) {
          const user = refreshauth.user
          const accessToken = refreshauth.accessToken 
          setAuth({ user, accessToken })
          navigate('/admin/upload', {replace: false});
        }
    }

    useEffect(() => {
        checkAuth();
      }, [])
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const LOGIN_URL = '/login';

        var body = 'grant_type=&username='+user+'&password='+pwd+'&scope=&client_id=&client_secret='
        try {
            const response = await axios.post(LOGIN_URL, body, {
                headers: {
                    'accept': 'application/json',
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
            const accessToken = response?.data;
            setAuth({ user, accessToken })
            setUser('');
            setPwd('');
            navigate('/admin/upload', {replace: true});
        } catch (err) {
            if (!err.response) {
                setErrMsg('No server response');
                toast.error('No server response')
            } else if (err.response?.status === 422) {
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
        </>
    )
} 
export default LoginPage;

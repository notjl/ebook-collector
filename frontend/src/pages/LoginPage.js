import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
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
        console.log(user, pwd)
        var body = 'grant_type=&username='+user+'&password='+pwd+'&scope=&client_id=&client_secret='

        try {
            const response = await axios.post(LOGIN_URL, body, {
                headers: {
                    'accept': 'application/json',
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken})
            setUser('');
            setPwd('');
            setSuccess(true);

        } catch (err) {
            if (!err.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
         {success ? (
            <section>
                <h1>You are logged In!</h1>
                <br />
                <p>
                    <a href="/">Go to Home</a>
                </p>
            </section>
         ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input type="text" 
                    name="" 
                    id="username" 
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor='password'>Password:</label>
                <input type="password" 
                    name="" 
                    id="password" 
                    autoComplete="off"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Login</button>
            </form>
            <p>
                Need an account?<br/>
                <span className="line">
                    <p>Contact your institute administration</p>
                    
                </span>
            </p>
        </section>
        )}
        </>
    )
} 
export default LoginPage;
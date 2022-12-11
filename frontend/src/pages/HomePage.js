import React, {useEffect} from 'react';

import Navbar from '../components/NavbarHome';
import VideoBG from '../components/VideoBG';
import useAuth from '../hooks/useAuth';

const Homepage = () => {

  const { setAuth } = useAuth();

  const checkAuth = () => {
    let refreshauth = JSON.parse(sessionStorage.getItem('key'));
    if (refreshauth !== null) {
      const user = refreshauth.user;
      const accessToken = refreshauth.accessToken;
      setAuth({ user, accessToken });
    }
  }
    
  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <div>
        <Navbar />
        <VideoBG />
    </div>
  )
}

export default Homepage;

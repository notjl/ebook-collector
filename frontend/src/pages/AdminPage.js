import { Link, Outlet } from "react-router-dom";
import "./AdminPage.css"

import NavBar from "../components/Navbar";
import ImageBG from "../components/ImageBG";

import useAuth from '../hooks/useAuth';

function UploadNav() {

  const { auth, setAuth } = useAuth();

  sessionStorage.setItem('key', JSON.stringify(auth));

  const logout = async () => {
    sessionStorage.removeItem("key");
    setAuth(null)
  }

    return(
      <>
        <div>
          <NavBar />
          <ImageBG heading='ADMIN PANEL'/>
        </div>
        <div className="upload">
        <div className="uploadNav">
          <Link style={{textDecoration: 'none'}} to="/admin/upload"> <button>UPLOAD</button> </Link>
          <Link style={{textDecoration: 'none'}} to="/admin/edit"> <button>EDIT</button> </Link>
          <Link style={{textDecoration: 'none'}} to="/admin/delete"><button>DELETE</button> </Link>
          <Link style={{textDecoration: 'none'}} to="/admin/approve"><button>APPROVE</button></Link>
          <Link style={{textDecoration: 'none'}} ><button onClick={logout}>LOGOUT</button></Link>
        </div>
  
        <Outlet />
        </div>
      </>
    );
  }

export default UploadNav;
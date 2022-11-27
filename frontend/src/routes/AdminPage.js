import { Link, Outlet } from "react-router-dom";
import ImageBG from "../components/ImageBG";
import Navbar from "../components/Navbar";
import "./AdminPage.css"

function UploadNav() {
    return(
        <div>
        <Navbar />
        <ImageBG heading='ADMIN'/>
        <div className="upload">
        <div className="uploadNav">
          <Link style={{textDecoration: 'none'}} to="/admin/upload"> <button>UPLOAD</button> </Link>
          <Link style={{textDecoration: 'none'}} to="/admin/edit"> <button>EDIT</button> </Link>
          <Link style={{textDecoration: 'none'}} to="/admin/delete"><button>DELETE</button> </Link>
          <Link style={{textDecoration: 'none'}} to="/admin/approve"><button>APPROVE</button></Link>
        </div>
  
        <Outlet />
      </div>
      </div>
    );
  }

export default UploadNav;
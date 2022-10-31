import { Link, Outlet } from "react-router-dom";
import "./UploadPage.css"

function UploadNav() {
    return(
        <div className="upload">
        <div className="uploadNav">
          <Link style={{textDecoration: 'none'}} to="/upload/pdf"> <button>UPLOAD</button> </Link>
          <Link style={{textDecoration: 'none'}} to="/upload/edit"> <button>EDIT</button> </Link>
          <Link style={{textDecoration: 'none'}} to="/upload/delete"><button>DELETE</button> </Link>
        </div>
  
        <Outlet />
      </div>
    );
  }

export default UploadNav;
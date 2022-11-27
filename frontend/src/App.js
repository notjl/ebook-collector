import React from "react";
import {Routes, Route} from 'react-router-dom';

import Aboutpage from "./routes/Aboutpage";
import ArticlePage from "./routes/Articlepage";
import Homepage from "./routes/Homepage";
import LoginPage from "./routes/Loginpage";
import RequireAuth from './components/RequireAuth';
import ArticlesListPage from './routes/ArticlesListPage';
import CoursesListPage from './routes/CoursesListPage';
import SearchPage from './routes/SearchPage';
import NotFoundPage from './routes/NotFoundPage';
import UploadPage from './routes/AdminPage';
import UploadPdf from './routes/UploadPage';
import UploadEdit from './routes/AdminEdit';
import UploadDelete from './routes/AdminDelete';
import UploadApprove from './routes/AdminApprove';
import ApprovePage from './routes/ApprovePage';
import EditPage from './routes/EditPage';
import DeletePage from './routes/DeletePage';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/about' element={<Aboutpage />} />
          <Route path="/a"            element={<ArticlesListPage/>} />
            <Route path="/a/:articleID" element={<ArticlePage/>} />
            <Route path="/c/:courseID"  element={<CoursesListPage/>} />
            <Route path="/s/"           element={<ArticlesListPage/>} />
            <Route path="/s/:searchID"  element={<SearchPage/>} />
            <Route path="/login"        element={<LoginPage />}/>
            <Route                      element={<RequireAuth />}>
              <Route path="/admin"     element={<UploadPage/>}>
                <Route path="upload"       element={<UploadPdf/>}/>
                <Route path="edit"      element={<UploadEdit/>}/>
                <Route path="edit=:articleID" element={<EditPage/>}/>
                <Route path="delete"    element={<UploadDelete/>}/>
                <Route path="delete=:articleID" element={<DeletePage/>}/>
                <Route path="approve" element={<UploadApprove/>}/>
                <Route path="approve=:articleID" element={<ApprovePage/>}/>
              </Route>
            </Route>
            <Route path="*"             element={<NotFoundPage/>} />
          </Routes>
    </div>
  );
}

export default App;

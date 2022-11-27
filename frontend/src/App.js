import './App.css';
import RequireAuth from './components/RequireAuth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesListPage';
import CoursesListPage from './pages/CoursesListPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';
import UploadPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import UploadPdf from './pages/UploadPage';
import UploadEdit from './pages/AdminEdit';
import UploadDelete from './pages/AdminDelete';
import UploadApprove from './pages/AdminApprove';

import"./components/background/background.css";
import Main from './components/background/homeBG';
import ApprovePage from './pages/ApprovePage';
import EditPage from './pages/EditPage';
import DeletePage from './pages/DeletePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div id="page-body">
            <Routes>
            <Route path="/"             element={<HomePage/>} />
            <Route path="/about"        element={<AboutPage/>} />
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
      </div>
      
     

    </BrowserRouter>

  );
}

export default App;
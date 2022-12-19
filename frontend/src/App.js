import RequireAuth from './components/RequireAuth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesListPage';
import CoursesListPage from './pages/CoursesListPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';
import AdminEdit from './pages/AdminEdit';
import AdminDelete from './pages/AdminDelete';
import AdminApprove from './pages/AdminApprove';
import ApprovePage from './pages/ApprovePage';
import EditPage from './pages/EditPage';
import DeletePage from './pages/DeletePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
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
              <Route path="/admin"     element={<AdminPage/>}>
                <Route path="upload"       element={<UploadPage/>}/>
                <Route path="edit"      element={<AdminEdit/>}/>
                <Route path="edit/:articleID" element={<EditPage/>}/>
                <Route path="delete"    element={<AdminDelete/>}/>
                <Route path="delete/:articleID" element={<DeletePage/>}/>
                <Route path="approve" element={<AdminApprove/>}/>
                <Route path="approve/:articleID" element={<ApprovePage/>}/>
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
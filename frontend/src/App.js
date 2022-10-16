import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesListPage';
import NotFoundPage from './pages/NotFoundPage';
import UploadPage from './pages/UploadPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div id="page-body">
            <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/a" element={<ArticlesListPage/>} />
            <Route path="/a/:articleID" element={<ArticlePage/>} />
            <Route path="/upload" element={<UploadPage/>} />
            <Route path="/login" element={<LoginPage />}/>
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
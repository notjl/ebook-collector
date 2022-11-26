import React from "react";
import {Routes, Route} from 'react-router-dom';

import Aboutpage from "./routes/Aboutpage";
import Articlepage from "./routes/Articlepage";
import Homepage from "./routes/Homepage";
import LoginPage from "./routes/Loginpage";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/About' element={<Aboutpage />} />
          <Route path='/Article' element={<Articlepage />} />
          <Route path='/Login' element={<LoginPage />} />
        </Routes>
    </div>
  );
}

export default App;

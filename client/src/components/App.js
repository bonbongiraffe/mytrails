import '../styling/App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Authentication from "./Authentication";
import Home from "./Home"
import HikePage from "./HikePage"
import Social from "./Social"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Authentication />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='hikes' element={<HikePage />} />
          <Route path='social' element={<Social />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

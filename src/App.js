
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Vacancies from './components/pages/Vacancies';
import Home from './components/pages/Home';

// import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <div>
      <div className="content-container">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path='/vacancies' element={<Vacancies/>} />
        </Routes>
        {/* <Footer/> */}
      </div>
      </div>
      
    </div>
  );
}

export default App;

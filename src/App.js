
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Vacancies from './components/pages/Vacancies';
import Home from './components/pages/Home';

import Footer from './components/Footer';
import SignUp from './components/pages/SignUp';

function App() {
  return (
    <div className="App">
      <div>
      <div className=" ">
         {/*to add same blue color when scrolling----- */}
        <div className='content-containerr'>
           <Navbar/>
        </div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path='/vacancies' element={<Vacancies/>} />
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
        <Footer/>
      </div>
      </div>
      
    </div>
  );
}

export default App;

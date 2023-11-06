
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Vacancies from './components/pages/Vacancies';
import Home from './components/pages/Home';

function App() {
  return (
    <div className="App">
     <Navbar/>

     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/about" element={<About />} />
       <Route path="/login" element={<Login />} />
       <Route path='/vacancies' element={<Vacancies/>}/>
    
       
     </Routes>
    </div>
  );
}

export default App;

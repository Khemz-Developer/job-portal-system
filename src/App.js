
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './authContext';
import Navbar from './components/Navbar';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Vacancies from './components/pages/Vacancies';

import { VacancyProvider } from './VacancyContext';
import Footer from './components/Footer';
import AcceptedCVs from './components/SidePages/AcceptedCVs';
import JobCreate from './components/SidePages/JobCreate';
import JobModify from './components/SidePages/JobModify';
import ReceivedCVs from './components/SidePages/ReceivedCVs';
import RejectedCVs from './components/SidePages/RejectedCVs';
import SignUp from './components/pages/SignUp';
import UserJobStatus from './components/usersidepages/UserJobStatus';
import UserJopApply from './components/usersidepages/UserJopApply';
import UserVacancy from './components/usersidepages/UserVacancy';
import PrivateRoute from './privateroute';
function App() {

  return (
    <div className="App">
      <div>
      <div className=" ">
         {/*to add same blue color when scrolling----- */}
        
        
        {/* <div className='content-containerr'><Navbar/></div> */}
        
        <AuthProvider>
        <VacancyProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/vacancies' element={<Vacancies/>} />
          <Route path='/users/signup' element={<SignUp/>}/>
          <Route
          path="/users/login"
          element={<Login/>}
          />
          
          {/*ROUTE FOR USER PAGES*/}
          <Route path="/users/uservacancy" element={<PrivateRoute> <UserVacancy/> </PrivateRoute>}/>
          <Route path="/users/apply" element={<PrivateRoute> <UserJopApply /> </PrivateRoute>} />
          <Route path="/users/status"  element={<PrivateRoute> <UserJobStatus /> </PrivateRoute>} />
          {/*ROUTE FOR ADMIN PAGES*/}
          <Route path="/admin/create" element={<PrivateRoute> <JobCreate  />  </PrivateRoute>} />
          <Route path="/admin/modi" element={<PrivateRoute> <JobModify /> </PrivateRoute> } />
          <Route path="/admin/accept" element={<PrivateRoute><AcceptedCVs  /></PrivateRoute>} />
          <Route path="/admin/received" element={<PrivateRoute> <ReceivedCVs /> </PrivateRoute>} />
          <Route path="/admin/reject" element={<PrivateRoute> <RejectedCVs /> </PrivateRoute>} />
          
        </Routes>
        </VacancyProvider>
        </AuthProvider>
        <Footer/>
      </div>
      </div>
      
    </div>
  );
}

export default App;

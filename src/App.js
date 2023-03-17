
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Address } from './Components/Address';
import { Booking } from './Components/Booking';
import { BuggyReq } from './Components/BuggyRequest';
import { Cash } from './Components/Cash';
import { Card } from './Components/Crad';
import { DigitalCard } from './Components/DigitalCard';
import { Driver } from './Components/Driver';
import { DriverPage } from './Components/DriversDash';
import { Login } from './Components/Login';


import { Main, MainDash } from './Components/Main';
import { Report } from './Components/Report';
import { Setting } from './Components/Setting';
import { Shedule } from './Components/Shedule';
import { Vehicle } from './Components/Vehicle';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Booking />}></Route>
        <Route path='login' element={<Login/>}></Route>
          <Route path='main' element={<MainDash />}>
            <Route path='buggy-request' element={<BuggyReq />}></Route>
            <Route path='report' element={<Report />}></Route>
            <Route path='vehicle' element={<Vehicle />}></Route>
            <Route path='address' element={<Address />}></Route>
            <Route path='setting' element={<Setting />}></Route>
            <Route path='card' element={<Card/>}></Route>
            <Route path='cash' element={<Cash/>}></Route>
          </Route>
          <Route path='driver/:id' element={<Driver />}></Route>
          <Route path='digital-card/:id' element={<DigitalCard />}></Route>
          <Route path='driver-dash' element={<DriverPage />}></Route>
          <Route path='schedule' element={<Shedule/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

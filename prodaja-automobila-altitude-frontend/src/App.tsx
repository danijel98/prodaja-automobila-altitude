import React from "react";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./route/PrivateRoute";
import Login from "./components/auth/Login";
import Home from "./components/home/Home";
import Cars from "./components/cars/Cars";
import CarDetails from "./components/cars/car/CarDetails";
import 'react-confirm-alert/src/react-confirm-alert.css';


function App() {
  
  return (
    <HashRouter>
      <Routes>
        <Route path="/home" element={<PrivateRoute roles={['admin','user','guest']}  />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path='/cars' element={<PrivateRoute roles={['admin','user']}  />}>
          <Route path='/cars' element={<Cars />} />
        </Route>
        <Route path='/cars/:carId' element={<PrivateRoute roles={['admin','user']} />}>
          <Route path='/cars/:carId' element={<CarDetails />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;


import React, {useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Login from '../components/Login'
import Register from './Register';
import SuccessfullyRegistration from './SuccessfullyRegistration';
import Home from './Home';
import ProtectedRoute from '../components/ProtectedRoute';
import ForgotPassword from './ForgotPassword';
export default function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element= {<Login/>}></Route>
                <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                <Route path="/login" element= {<Login/>}></Route>
                <Route path="/logout" element= {<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/success" element ={<SuccessfullyRegistration/>}></Route>
                <Route path="/forgotpassword" element ={<ForgotPassword/>}></Route>
            </Routes>
        </Router>
    )
}

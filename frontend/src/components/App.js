
import React, {useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Login from '../components/Login'
import Register from './Register';
import SuccessfullyPage from './SuccessfullyPage';
import Home from './Home';
import ProtectedRoute from '../components/ProtectedRoute';
import ForgotPassword from './ForgotPassword';
import EnterCode from './EnterCode';
import Logo from './Logo';
import Header from './Header';
import UserDescription from './UserDescription';
import Recipie from './Recipie';
import Feedback from './Feedback';
import RecipesView from './RecipesView';
export default function App(){
    return(
       <RecipesView></RecipesView>
        // <Router>
        //     <Routes>
        //         <Route path="/" element= {<Login/>}></Route>
        //         <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        //         <Route path="/login" element= {<Login/>}></Route>
        //         <Route path="/logout" element= {<Login/>}></Route>
        //         <Route path="/register" element={<Register/>}></Route>
        //         <Route path="/success" element ={<SuccessfullyPage/>}></Route>
        //         <Route path="/forgotpassword" element ={<ForgotPassword/>}></Route>
        //         <Route path="/entercode" element ={<EnterCode/>}></Route>
        //     </Routes>
        // </Router>
    )
}

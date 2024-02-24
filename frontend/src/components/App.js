
import React from 'react';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Login from '../components/Login'
import Register from './Register';
import SuccessfullyRegistration from './SuccessfullyRegistration';
import Home from './Home';
export default function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element= {<Login/>}></Route>
                <Route path="/home" element= {<Home></Home>}></Route>
                <Route path="/login" element= {<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/success" element ={<SuccessfullyRegistration/>}></Route>
            </Routes>
        </Router>
    )
}
